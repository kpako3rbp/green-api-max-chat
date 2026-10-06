import type { Credentials } from '../../auth';
import type { SendMessageResponse } from '../model/types';
import { buildGreenApiUrl } from './buildUrl';
import { request } from './request';

type SendMessageParams = {
  chatId: string;
  message: string;
};

export const sendMessage = (credentials: Credentials, params: SendMessageParams) => {
  const url = buildGreenApiUrl(credentials, 'sendMessage');

  return request<SendMessageResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};
