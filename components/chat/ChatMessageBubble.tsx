import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatMessage} from '../../src/services/aiService';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({message}) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowModel,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.modelBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.modelText,
          ]}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessageBubble;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowModel: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#0B93F6',
    borderBottomRightRadius: 6,
  },
  modelBubble: {
    backgroundColor: '#1B1B1F',
    borderBottomLeftRadius: 6,
    borderColor: '#27272E',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#F5F5F5',
  },
  modelText: {
    color: '#E4E6EB',
  },
});
