import { type Message } from '@/entities/message';

export const getLastMessage = (messages: Message[] | undefined) => {
  if (!messages?.length) {
    return null;
  }

  return messages[messages.length - 1];
};
