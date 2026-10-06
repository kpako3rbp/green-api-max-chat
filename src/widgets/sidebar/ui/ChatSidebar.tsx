import classNames from 'classnames';

import { type Chat } from '@/entities/chat';

import { LogOut, Plus } from '@/shared/ui/Icon';
import styles from './ChatSidebar.module.css';
import { formatPhone } from '@/shared/lib/phone';
import { getAvatarColor } from '@/shared/lib/avatar';

import { type MessagesByChat } from '@/entities/message';
import { getLastMessage } from '@/features/message';
import { formatChatTime } from '@/shared/lib/date';
import { sortChatsByActivity } from '@/features/chat';

type ChatSidebarProps = {
  chats: Chat[];
  messagesByChat: MessagesByChat;
  activeChatId?: string;
  onChatSelect: (chat: Chat) => void;
  onCreateChat: () => void;
  onLogout: () => void;
};

export const ChatSidebar = ({
  chats,
  activeChatId,
  onChatSelect,
  onCreateChat,
  onLogout,
  messagesByChat,
}: ChatSidebarProps) => {
  const sortedChats = sortChatsByActivity(chats, messagesByChat);

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чаты</h1>

        <button
          className={styles.createButton}
          type="button"
          onClick={onCreateChat}
          aria-label="Новый чат"
        >
          <Plus size={22} />
        </button>
      </header>

      <div className={styles.chats}>
        {chats.length === 0 ? (
          <div className={styles.empty}>Нет чатов</div>
        ) : (
          sortedChats.map((chat) => {
            const title = chat.name || formatPhone(chat.phone);
            const avatarColor = getAvatarColor(chat.id);

            const messages = messagesByChat[chat.id];
            const lastMessage = getLastMessage(messages);

            return (
              <button
                key={chat.id}
                type="button"
                className={classNames(styles.chat, activeChatId === chat.id && styles.activeChat)}
                onClick={() => onChatSelect(chat)}
              >
                <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
                  {chat.phone.slice(chat.phone.length - 4, chat.phone.length).toUpperCase()}
                </div>

                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <span className={styles.chatTitle}>{title}</span>

                    {lastMessage && (
                      <span className={styles.chatTime}>
                        {formatChatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>

                  <span className={styles.chatPreview}>
                    {lastMessage
                      ? `${lastMessage.direction === 'outgoing' ? 'Вы: ' : ''}${lastMessage.text}`
                      : 'Нет сообщений'}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <footer className={styles.footer}>
        <button className={styles.logout} type="button" onClick={onLogout}>
          <LogOut size={19} />

          <span>Выйти</span>
        </button>
      </footer>
    </aside>
  );
};
