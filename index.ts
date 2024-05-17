import { useEffect, useRef, useState } from "react";

// useRemount Hook
export const useRemount = (dependencies: any[] = []) => {
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    setKey(Math.random());
  }, dependencies);

  return {
    key,
    remount: () => setKey(Math.random())
  };
};

// usePrevious Hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

// useTimeout Hook
export const useTimeout = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
};

// useInterval Hook
export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const tick = () => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      };

      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// useRequest Hook
export const useRequest = (requestFunction: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await requestFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, error, loading, retry: fetchData };
};

// Exporting all hooks
const SuperReact = {
  useRemount,
  usePrevious,
  useTimeout,
  useInterval,
  useRequest
};

export default SuperReact;
