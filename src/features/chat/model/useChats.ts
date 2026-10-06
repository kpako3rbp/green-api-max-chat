import { useCallback } from 'react';

import { type Chat } from '@/entities/chat';
import { StorageKey } from '@/shared/config/storage';
import { localStorageService, usePersistedState } from '@/shared/lib/storage';

export const useChats = () => {
  const [chats, setChats] = usePersistedState<Chat[]>(StorageKey.chats, [], localStorageService);

  const addChat = useCallback(
    (chat: Chat) => {
      setChats((prev) => {
        const isExist = prev.some(({ id }) => id === chat.id);

        if (isExist) {
          return prev;
        }

        return [chat, ...prev];
      });
    },
    [setChats],
  );

  return { chats, addChat };
};
