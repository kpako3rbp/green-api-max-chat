import classNames from 'classnames';

import styles from './MessageBubble.module.css';
import { formatMessageTime } from '@/shared/lib/date';
import type { Message } from '@/entities/message';

type MessageBubbleProps = {
  message: Message;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isOutgoing = message.direction === 'outgoing';

  return (
    <div className={classNames(styles.message, isOutgoing ? styles.outgoing : styles.incoming)}>
      <span className={styles.text}>{message.text}</span>

      <span className={styles.meta}>
        {formatMessageTime(message.timestamp)}
      </span>
    </div>
  );
};
