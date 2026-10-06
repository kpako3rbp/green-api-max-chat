export type InstanceState = 'authorized' | 'notAuthorized' | 'blocked' | 'starting';

export type GetStateInstanceResponse = {
  stateInstance: InstanceState;
};

export type CheckAccountResponse = {
  exist: boolean;
  chatId?: string;
  username?: string;
  phoneNumber?: number;
  fromCache?: boolean;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type TextMessageData = {
  textMessage: string;
  isForwarded?: boolean;
};

export type IncomingMessageData = {
  typeMessage: 'textMessage';
  textMessageData: TextMessageData;
};

export type IncomingMessageBody = {
  typeWebhook: 'incomingMessageReceived';
  timestamp: number;
  idMessage: string;

  senderData: {
    chatId: string;
    sender: string;
    senderName?: string;
  };

  messageData: IncomingMessageData;
};

export type DeleteNotificationResponse = {
  result: boolean;
};

export type GreenApiNotificationBody = {
  typeWebhook: string;
  timestamp?: number;
  idMessage?: string;

  senderData?: {
    chatId?: string;
    sender?: string;
    senderName?: string;
  };

  messageData?: {
    typeMessage?: string;

    textMessageData?: {
      textMessage?: string;
      isForwarded?: boolean;
    };
  };
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: GreenApiNotificationBody;
};
