import { type Chat } from '@/entities/chat';
import { Chat as ChatWidget } from '@/widgets/chat';
import { type Credentials } from '../../features/auth';
import { CreateChatForm, useChats, useCreateChat } from '../../features/chat';

import { StorageKey } from '@/shared/config/storage';
import { usePersistedState } from '@/shared/lib/storage';
import { localStorageService } from '@/shared/lib/storage/storage';
import styles from './ChatPage.module.css';
import { useCallback, useState } from 'react';
import { ChatSidebar } from '@/widgets/sidebar';
import type { Message, MessagesByChat } from '@/entities/message';
import { useReceiveMessages } from '@/features/message';

type ChatPageProps = {
  credentials: Credentials;
  onLogout: () => void;
};

export const ChatPage = ({ credentials, onLogout }: ChatPageProps) => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const [activeChat, setActiveChat] = usePersistedState<Chat | null>(
    StorageKey.activeChat,
    null,
    localStorageService,
  );

  const [messagesByChat, setMessagesByChat] = usePersistedState<MessagesByChat>(
    StorageKey.messages,
    {},
    localStorageService,
  );

  const { chats, addChat } = useChats();

  const handleChatCreated = (chat: Chat) => {
    addChat(chat);
    setActiveChat(chat);
    setIsCreatingChat(false);
  };

  const { createChat, isLoading, error } = useCreateChat({
    credentials,
    onSuccess: handleChatCreated,
  });

  const handleCreateChat = () => {
    setIsCreatingChat(true);
  };

  const handleChatSelect = (chat: Chat) => {
    setActiveChat(chat);
    setIsCreatingChat(false);
  };

  const handleMessage = useCallback(
    (message: Message) => {
      setMessagesByChat((prev) => {
        const currentMessages = prev[message.chatId] ?? [];

        const isExist = currentMessages.some(({ id }) => id === message.id);

        if (isExist) {
          return prev;
        }

        return {
          ...prev,
          [message.chatId]: [...currentMessages, message],
        };
      });
    },
    [setMessagesByChat],
  );

  const { isConnected } = useReceiveMessages({
    credentials,
    onMessage: handleMessage,
  });

  return (
    <>
      <ChatSidebar
        chats={chats}
        messagesByChat={messagesByChat}
        activeChatId={activeChat?.id}
        onChatSelect={handleChatSelect}
        onCreateChat={handleCreateChat}
        onLogout={onLogout}
      />

      <section className={styles.content}>
        {isCreatingChat ? (
          <div className={styles.createChat}>
            <div className={styles.createChatCard}>
              <h2 className={styles.createChatTitle}>Новый чат</h2>

              <CreateChatForm onSubmit={createChat} isLoading={isLoading} error={error} />
            </div>
          </div>
        ) : activeChat ? (
          <ChatWidget
            chat={activeChat}
            credentials={credentials}
            messages={messagesByChat[activeChat.id] ?? []}
            onMessage={handleMessage}
            isConnected={isConnected}
          />
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyContent}>
              <span className={styles.emptyTitle}>Выберите чат</span>

              <button className={styles.emptyDescription} onClick={handleCreateChat}>
                или создайте новый
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
