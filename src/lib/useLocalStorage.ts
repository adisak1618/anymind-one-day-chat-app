import { useState, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with React state synchronization
 * @param key - The localStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getStoredValue = useCallback((): T => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState<T>(getStoredValue);

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      
      setValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  }, [key, value]);

  const removeStoredValue = useCallback(() => {
    try {
      setValue(defaultValue);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, removeStoredValue] as const;
};
