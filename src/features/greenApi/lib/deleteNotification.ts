import type { Credentials } from '../../auth';
import type { DeleteNotificationResponse } from '../model/types';
import { buildGreenApiUrl } from './buildUrl';
import { request } from './request';

export const deleteNotification = (credentials: Credentials, receiptId: number) => {
  const url = `${buildGreenApiUrl(credentials, 'deleteNotification')}/${receiptId}`;

  return request<DeleteNotificationResponse>(url, {
    method: 'DELETE',
  });
};
