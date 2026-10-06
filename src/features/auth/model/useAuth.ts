import { useState } from 'react';

import { getStateInstance } from '../../greenApi';
import { StorageKey } from '@/shared/config/storage';
import { sessionStorageService } from '@/shared/lib/storage';

import { type Credentials } from './auth.types';

export const useAuth = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(() =>
    sessionStorageService.get<Credentials>(StorageKey.credentials),
  );

  const login = async (credentials: Credentials) => {
    const { stateInstance } = await getStateInstance(credentials);

    if (stateInstance !== 'authorized') {
      throw new Error(`Инстанс не готов к работе: ${stateInstance}`);
    }

    sessionStorageService.set(StorageKey.credentials, credentials);

    setCredentials(credentials);
  };

  const logout = () => {
    sessionStorageService.remove(StorageKey.credentials);

    setCredentials(null);
  };

  return {
    credentials,
    isAuthenticated: Boolean(credentials),
    login,
    logout,
  };
};
