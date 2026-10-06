import { ApiError } from './request';
import { buildGreenApiUrl } from './buildUrl';
import { request } from './request';

import { type Credentials } from '@/features/auth';
import type { ReceiveNotificationResponse } from '../model/types';

export const receiveNotification = async (credentials: Credentials) => {
  const url = `${buildGreenApiUrl(credentials, 'receiveNotification')}?receiveTimeout=5`;

  try {
    return await request<ReceiveNotificationResponse | null>(url);
  } catch (error) {
    if (error instanceof ApiError && error.status === 408) {
      return null;
    }

    throw error;
  }
};
