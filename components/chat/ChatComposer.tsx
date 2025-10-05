import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

interface ChatComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  isSending?: boolean;
}

const ChatComposer: React.FC<ChatComposerProps> = ({
  value,
  onChangeText,
  onSend,
  placeholder = 'Kirim pesan kepada Aicode...',
  disabled = false,
  isSending = false,
}) => {
  const isButtonDisabled = disabled || !value.trim();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7D7F88"
        value={value}
        onChangeText={onChangeText}
        multiline
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          isButtonDisabled && styles.sendButtonDisabled,
        ]}
        onPress={onSend}
        disabled={isButtonDisabled}
      >
        <Text style={styles.sendButtonText}>{isSending ? '...' : '→'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatComposer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D0D10',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#1F1F23',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#F5F5F5',
    backgroundColor: '#1B1B1F',
  },
  sendButton: {
    marginLeft: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B93F6',
  },
  sendButtonDisabled: {
    backgroundColor: '#2E4056',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
