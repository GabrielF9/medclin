import isClient from './isClient';

interface IInMemoryStorage {
  [key: string]: string;
}

const MedClinStorage = (storage: Storage) => {
  const prefix = '@MedClin';

  let inMemoryStorage: IInMemoryStorage = {};

  const getPrefix = (name: string) => {
    return `${prefix}:${name}`;
  };

  const isStorageSupported = () => {
    try {
      const testKey = getPrefix('test');
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  const clear = () => {
    if (isStorageSupported()) {
      storage.clear();
    } else {
      inMemoryStorage = {};
    }
  };

  const getItem = (name: string) => {
    try {
      if (isStorageSupported()) {
        const value = storage.getItem(getPrefix(name));
        return value ? JSON.parse(value) : null;
      }

      if (Object.keys(inMemoryStorage).includes(name)) {
        return inMemoryStorage[name];
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  const removeItem = (name: string) => {
    if (isStorageSupported()) {
      storage.removeItem(getPrefix(name));
    } else {
      delete inMemoryStorage[name];
    }
  };

  const setItem = (name: string, value: any) => {
    if (isStorageSupported()) {
      storage.setItem(getPrefix(name), JSON.stringify(value));
      return value;
    }

    inMemoryStorage[name] = JSON.stringify(value);
    return null;
  };

  const clearWithPrefix = () => {
    if (isStorageSupported()) {
      const allKeysItemsStorage = Object.keys(storage);

      allKeysItemsStorage.forEach((key) => {
        if (key.includes(prefix)) {
          storage.removeItem(key);
        }
      });
    }
  };

  const getLength = () => {
    return storage.length;
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    getLength,
    clearWithPrefix,
  };
};

const createStorage = () => {
  const defaultStorage = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
    getLength: () => 0,
    clearWithPrefix: () => null,
  };

  if (!isClient()) {
    return {
      local: defaultStorage,
      session: defaultStorage,
    };
  }

  return {
    local: MedClinStorage(window.localStorage),
    session: MedClinStorage(window.sessionStorage),
  };
};

const storage = createStorage();

export default storage;
