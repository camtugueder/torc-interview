import React, { useEffect, useState } from "react";

const useLocalStorage = <T,>(key:string, initialValue: T):[T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(()=>{
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch ( error ) {
      return initialValue;
    }
  });

  useEffect(()=>{
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch ( error ) {
      console.error(error);
    }
  },[key, storedValue])

  return [storedValue, setStoredValue];

}

export default useLocalStorage;