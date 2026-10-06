import { type RefObject } from 'react';

import styles from './MessageList.module.css';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import type { Message } from '@/entities/message';

type MessageListProps = {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
};

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className={styles.messages}>
      <div className={styles.content}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
