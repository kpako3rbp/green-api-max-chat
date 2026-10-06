import type { ReceiveNotificationResponse } from '../../greenApi/model/types';

export const isIncomingTextMessage = (notification: ReceiveNotificationResponse) => {
  const { body } = notification;

  return (
    body.typeWebhook === 'incomingMessageReceived' &&
    body.messageData?.typeMessage === 'textMessage' &&
    Boolean(body.messageData.textMessageData?.textMessage) &&
    Boolean(body.idMessage) &&
    Boolean(body.senderData?.chatId)
  );
};
