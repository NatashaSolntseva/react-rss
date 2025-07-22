import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item !== null ? item : initialValue;
  });

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeStoredValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setStoredValue, removeStoredValue] as const;
}
