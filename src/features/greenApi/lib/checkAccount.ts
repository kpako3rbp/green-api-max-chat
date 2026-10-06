import type { Credentials } from '../../auth';
import type { CheckAccountResponse } from '../model/types';
import { buildGreenApiUrl } from './buildUrl';
import { request } from './request';

export const checkAccount = (credentials: Credentials, phoneNumber: string) => {
  const url = buildGreenApiUrl(credentials, 'checkAccount');

  return request<CheckAccountResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
    }),
  });
};
