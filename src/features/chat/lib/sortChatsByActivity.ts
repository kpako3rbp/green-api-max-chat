import { type Chat } from '@/entities/chat';
import { type MessagesByChat } from '@/entities/message';

export const sortChatsByActivity = (chats: Chat[], messagesByChat: MessagesByChat) => {
  return [...chats].sort((a, b) => {
    const aMessages = messagesByChat[a.id] ?? [];
    const bMessages = messagesByChat[b.id] ?? [];

    const aLastMessage = aMessages[aMessages.length - 1];
    const bLastMessage = bMessages[bMessages.length - 1];

    if (!aLastMessage && !bLastMessage) {
      return 0;
    }

    if (!aLastMessage) {
      return 1;
    }

    if (!bLastMessage) {
      return -1;
    }

    return bLastMessage.timestamp - aLastMessage.timestamp;
  });
};
