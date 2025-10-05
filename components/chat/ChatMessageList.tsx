import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ChatMessage} from '../../src/services/aiService';
import ChatMessageBubble from './ChatMessageBubble';

interface ChatMessageListProps {
  messages: ChatMessage[];
  emptyText?: string;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  emptyText = 'Mulai percakapan dengan mengetik pesan di bawah.',
}) => {
  return (
    <FlatList
      data={messages}
      renderItem={({item}) => <ChatMessageBubble message={item} />}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.content}
      style={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      }
    />
  );
};

export default ChatMessageList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7D7F88',
    fontSize: 14,
    paddingHorizontal: 24,
    lineHeight: 20,
  },
});
