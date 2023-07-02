import { useState } from "react";
import { IUser } from "~/types";

export const useLocalStorage = (keyName: string, defaultValue: IUser | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("useLocalStorage: ", err);
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error("useLocalStorage: ", err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
