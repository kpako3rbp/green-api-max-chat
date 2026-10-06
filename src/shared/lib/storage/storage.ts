const createStorage = (storage: Storage) => ({
  get<T>(key: string): T | null {
    const value = storage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T) {
    storage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    storage.removeItem(key);
  },
});

export const sessionStorageService = createStorage(sessionStorage);

export const localStorageService = createStorage(localStorage);
