import type { Credentials } from '../../auth';
import type { GetStateInstanceResponse } from '../model/types';
import { buildGreenApiUrl } from './buildUrl';
import { request } from './request';

export const getStateInstance = (credentials: Credentials) => {
  const url = buildGreenApiUrl(credentials, 'getStateInstance');

  return request<GetStateInstanceResponse>(url);
};
