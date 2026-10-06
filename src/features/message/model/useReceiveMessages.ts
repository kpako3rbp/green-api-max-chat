import { useEffect, useState } from 'react';

import { type Message } from '@/entities/message';
import { type Credentials } from '@/features/auth';

import { isIncomingTextMessage } from '../lib/isIncomingTextMessage';
import { mapNotificationToMessage } from '../lib/mapNotificationToMessage';
import { receiveNotification, deleteNotification } from '@/features/greenApi';

type UseReceiveMessagesParams = {
  credentials: Credentials;
  onMessage: (message: Message) => void;
};

export const useReceiveMessages = ({ credentials, onMessage }: UseReceiveMessagesParams) => {
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const poll = async () => {
      while (isActive) {
        try {
          const notification = await receiveNotification(credentials);

          if (!isActive) {
            return;
          }

          setIsConnected(true);
          setError(null);

          if (!notification) {
            continue;
          }

          if (isIncomingTextMessage(notification)) {
            onMessage(mapNotificationToMessage(notification));
          }

          await deleteNotification(credentials, notification.receiptId);
        } catch {
          if (!isActive) {
            return;
          }

          setIsConnected(false);
          setError('Нет соединения');

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    };

    void poll();

    return () => {
      isActive = false;
    };
  }, [credentials, onMessage]);

  return {
    isConnected,
    error,
  };
};
