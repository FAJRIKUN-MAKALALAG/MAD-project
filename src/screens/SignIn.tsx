import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Props = {
  onSuccess?: () => void;
};

const SignIn: React.FC<Props> = ({onSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSignIn = () => {
    setGeneralError(null);
    let valid = true;

    // reset
    setEmailError(null);
    setPasswordError(null);

    // email validation (very simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email wajib diisi');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      valid = false;
    }

    // password validation
    if (!password) {
      setPasswordError('Password wajib diisi');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      valid = false;
    }

    if (!valid) return;

    // success: navigate to App via onSuccess
    onSuccess?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Masuk</Text>
            <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="nama@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[styles.input, emailError && styles.inputError]}
              placeholderTextColor="#9CA3AF"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={[styles.label, {marginTop: 12}]}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              style={[styles.input, passwordError && styles.inputError]}
              placeholderTextColor="#9CA3AF"
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Lupa password?</Text>
            </TouchableOpacity>
            {generalError ? (
              <Text style={[styles.errorText, {textAlign: 'center', marginTop: 8}]}> 
                {generalError}
              </Text>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    color: '#6B7280',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#111827',
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  button: {
    height: 48,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  errorText: {
    color: '#DC2626',
    marginTop: 6,
    fontSize: 12,
  },
});
