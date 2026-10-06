import { useState } from 'react';
import { sendMessage } from '../../greenApi';
import { type Credentials } from '../../auth';
import type { Message } from '@/entities/message';

type UseSendMessageParams = {
  credentials: Credentials;
  chatId: string;
  onSuccess: (message: Message) => void;
};

export const useSendMessage = ({ credentials, chatId, onSuccess }: UseSendMessageParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sendMessage(credentials, {
        chatId,
        message: text,
      });

      onSuccess({
        id: response.idMessage,
        chatId,
        text,
        direction: 'outgoing',
        timestamp: Date.now(),
      });

      return true;
    } catch {
      setError('Не удалось отправить сообщение');

      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    send,
    isLoading,
    error,
  };
};
