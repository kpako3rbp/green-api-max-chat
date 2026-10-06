import { useState } from 'react';

import { type Chat } from '@/entities/chat';
import { type Credentials } from '../../auth';
import { checkAccount } from '../../greenApi';

type UseCreateChatParams = {
  credentials: Credentials;
  onSuccess: (chat: Chat) => void;
};

export const useCreateChat = ({ credentials, onSuccess }: UseCreateChatParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createChat = async (phone: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await checkAccount(credentials, phone);

      if (!response.exist || !response.chatId) {
        throw new Error('Пользователь не найден');
      }

      onSuccess({
        id: response.chatId,
        phone,
        name: response.username,
      });
    } catch {
      setError('Не удалось создать чат. Проверьте номер телефона.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createChat,
    isLoading,
    error,
  };
};
