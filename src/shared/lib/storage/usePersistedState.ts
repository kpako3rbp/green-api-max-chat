import { type Dispatch, type SetStateAction, useState } from 'react';

type StorageService = {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
};

export const usePersistedState = <T>(
  key: string,
  initialValue: T,
  storage: StorageService,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    return storage.get<T>(key) ?? initialValue;
  });

  const setPersistedState: Dispatch<SetStateAction<T>> = (value) => {
    setState((prevState) => {
      const nextState =
        typeof value === 'function' ? (value as (prevState: T) => T)(prevState) : value;

      storage.set(key, nextState);

      return nextState;
    });
  };

  return [state, setPersistedState];
};
