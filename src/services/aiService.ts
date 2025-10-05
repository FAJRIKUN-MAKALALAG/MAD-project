import {NativeModules, Platform} from 'react-native';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// Prioritas untuk USB + adb reverse
const ANDROID_USB_LOCALHOST = 'http://localhost:3000';

// Emulator Android (bukan device fisik)
const EMULATOR_LOCALHOST = 'http://10.0.2.2:3000';

// iOS simulator/mac
const IOS_LOCALHOST = 'http://localhost:3000';

// Opsional: pakai saat device fisik via Wi-Fi (tanpa reverse)
const MANUAL_LAN_BASE = 'http://192.168.1.7:3000'; // ganti ke IP laptop kamu bila perlu

const normalizeBase = (url: string) => url.replace(/\/$/, '');

const parseScriptHost = (): string | null => {
  const scriptURL = NativeModules.SourceCode?.scriptURL as string | undefined;
  if (!scriptURL) {
    return null;
  }
  const match = scriptURL.match(/^[^:]+:\/\/([^/:]+)(?::\d+)?/);
  return match?.[1] ?? null;
};

const uniqPreserveOrder = (arr: string[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of arr) {
    const k = normalizeBase(x);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
};

const resolveDevBaseCandidates = (): string[] => {
  const ordered: string[] = [];
  const hostFromScript = parseScriptHost();

  // 1) ANDROID USB + adb reverse => localhost:3000
  if (Platform.OS === 'android') {
    ordered.push(ANDROID_USB_LOCALHOST);
  }

  // 2) Host dari Metro bundler (biasanya IP laptop)
  if (hostFromScript) {
    ordered.push(`http://${hostFromScript}:3000`);
  }

  // 3) Emulator Android khusus (10.0.2.2) / iOS simulator (localhost)
  if (Platform.OS === 'android') {
    ordered.push(EMULATOR_LOCALHOST);
  } else {
    ordered.push(IOS_LOCALHOST);
  }

  // 4) Global override (bila kamu set di runtime: global.__AI_BASE_URL__ = "http://...")
  const globalOverride = (globalThis as {__AI_BASE_URL__?: unknown})
    .__AI_BASE_URL__;
  if (typeof globalOverride === 'string' && globalOverride.trim()) {
    ordered.push(globalOverride.trim());
  }

  // 5) Manual LAN (device fisik via Wi-Fi)
  if (MANUAL_LAN_BASE && !MANUAL_LAN_BASE.includes('<YOUR_LAPTOP_IP>')) {
    ordered.push(MANUAL_LAN_BASE);
  }

  // 6) Fallback terakhir sesuai platform
  ordered.push(Platform.OS === 'android' ? EMULATOR_LOCALHOST : IOS_LOCALHOST);

  return uniqPreserveOrder(ordered);
};

const PROD_BASE_URL = 'https://your-backend-domain.com'; // ganti saat produksi

const getBaseUrls = (): string[] => {
  if (!__DEV__) {
    return [normalizeBase(PROD_BASE_URL)];
  }
  return resolveDevBaseCandidates();
};

export async function sendMessage(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const baseUrls = getBaseUrls();
  let lastNetworkError: Error | null = null;

  for (const baseUrl of baseUrls) {
    try {
      return await fetchAndParse(`${baseUrl}/chat`, messages, signal);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error;
      }
      if (
        error instanceof Error &&
        error.message.startsWith('Network error:')
      ) {
        lastNetworkError = error;
        continue; // coba kandidat berikutnya
      }
      throw error; // error selain network (mis. 4xx/5xx) langsung lempar
    }
  }

  if (lastNetworkError) {
    throw lastNetworkError;
  }
  throw new Error('AI service base URL could not be resolved');
}

async function fetchAndParse(
  url: string,
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({messages}),
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`Network error: ${String(error)}`);
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`AI service error ${response.status}: ${errorText}`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error('AI service returned invalid JSON');
  }

  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as {reply?: unknown}).reply !== 'string'
  ) {
    throw new Error('AI service returned invalid payload');
  }

  return (data as {reply: string}).reply;
}
