import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {ChatMessage, sendMessage} from '../services/aiService';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatMessageList from '../../components/chat/ChatMessageList';
import ChatComposer from '../../components/chat/ChatComposer';
import ChatSidebar from '../../components/chat/ChatSidebar';

const LOGO = require('../../assets/Aicode.png');

export default function ChatScreen(): JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {role: 'user', content: trimmed};
    const historyForApi = [...messages, userMessage];

    setMessages(historyForApi);
    setInput('');
    setIsSending(true);

    const controller = new AbortController();
    abortControllerRef.current?.abort();
    abortControllerRef.current = controller;

    try {
      const reply = await sendMessage(historyForApi, controller.signal);
      const modelMessage: ChatMessage = {role: 'model', content: reply};
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('Pengiriman pesan dibatalkan');
        return;
      }

      console.error('Failed to send message', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        },
      ]);
    } finally {
      abortControllerRef.current = null;
      setIsSending(false);
    }
  }, [input, isSending, messages]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ChatHeader onPressSettings={handleToggleSidebar} logoSource={LOGO} />
        <ChatMessageList messages={messages} />
        <ChatComposer
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          disabled={isSending}
          isSending={isSending}
        />
      </KeyboardAvoidingView>
      <ChatSidebar visible={isSidebarVisible} onClose={handleCloseSidebar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
