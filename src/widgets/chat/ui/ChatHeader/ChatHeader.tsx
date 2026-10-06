import type { Chat } from '@/entities/chat';
import styles from './ChatHeader.module.css';
import { formatPhone } from '@/shared/lib/phone';
import { getAvatarColor } from '@/shared/lib/avatar';
import classNames from 'classnames';

type ChatHeaderProps = {
  chat: Chat;
  isConnected: boolean;
};

export const ChatHeader = ({ chat, isConnected }: ChatHeaderProps) => {
  const title = chat.name || formatPhone(chat.phone);

  const avatarColor = getAvatarColor(chat.id);

  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
          {chat.phone.slice(chat.phone.length - 4, chat.phone.length).toUpperCase()}
        </div>
        
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>

          <div className={styles.connection}>
            <span
              className={classNames(
                styles.connectionDot,
                isConnected ? styles.connected : styles.disconnected,
              )}
            />

            <span className={styles.connectionText}>
              {isConnected ? 'Подключено' : 'Нет соединения'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
