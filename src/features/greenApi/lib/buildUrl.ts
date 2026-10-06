import type { Credentials } from '../../auth';

export const buildGreenApiUrl = (credentials: Credentials, method: string) => {
  const { apiUrl, idInstance, apiTokenInstance } = credentials;

  const normalizedApiUrl = apiUrl.replace(/\/$/, '');

  return `${normalizedApiUrl}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};
