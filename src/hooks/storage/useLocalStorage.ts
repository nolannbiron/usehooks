import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T | undefined>>;

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T | undefined, SetValue<T>, any] {
  const readValue = useCallback((): T | undefined => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      } else {
        throw new Error("No value found");
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window == "undefined") {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        );
      }

      try {
        const newValue =
          value instanceof Function ? value(storedValue ?? undefined) : value;

        localStorage.setItem(key, JSON.stringify(newValue));

        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  const clearValue = useCallback(() => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried clearing localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.warn(`Error clearing localStorage key “${key}”:`, error);
    }
  }, [key]);

  return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
