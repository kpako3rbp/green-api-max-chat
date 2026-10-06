import { type Message } from '@/entities/message';
import type { ReceiveNotificationResponse } from '../../greenApi/model/types';

export const mapNotificationToMessage = (notification: ReceiveNotificationResponse): Message => {
  const { body } = notification;

  return {
    id: body.idMessage!,
    chatId: body.senderData!.chatId!,
    text: body.messageData!.textMessageData!.textMessage!,
    direction: 'incoming',
    timestamp: body.timestamp ? body.timestamp * 1000 : Date.now(),
  };
};
