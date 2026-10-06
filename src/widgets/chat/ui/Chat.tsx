import { useEffect, useRef } from 'react';

import { type Chat as ChatType } from '@/entities/chat';
import { type Message } from '@/entities/message';
import { type Credentials } from '@/features/auth';
import {
  MessageInput,
  useSendMessage
} from '@/features/message';

import styles from './Chat.module.css';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { MessageList } from './MessageList/MessageList';

type ChatProps = {
  chat: ChatType;
  credentials: Credentials;
  messages: Message[];
  onMessage: (message: Message) => void;
  isConnected: boolean;
};

export const Chat = ({ chat, credentials, messages, onMessage, isConnected }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { send, isLoading, error } = useSendMessage({
    credentials,
    chatId: chat.id,
    onSuccess: onMessage,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className={styles.chat}>
      <ChatHeader chat={chat} isConnected={isConnected} />

      <MessageList messages={messages} messagesEndRef={messagesEndRef} />

      <div className={styles.composer}>
        <MessageInput onSubmit={send} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};
