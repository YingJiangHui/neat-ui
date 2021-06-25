import { useCallback, useEffect, useMemo, useRef } from 'react';

type UseTimeoutType = <T>(
  timeout: number,
  callback: () => void,
  deps?: T[],
) => { trigger: () => void; clear: () => void };

const useTimeout: UseTimeoutType = (timeout, callback, deps = []) => {
  const refCallback = useRef<() => void>(() => {});
  const refTimer = useRef<number | NodeJS.Timeout | null>(null);
  const refTimeout = useRef<number>();
  const clear = () => {
    if (window) window.clearTimeout(refTimer.current as number);
    else {
      clearTimeout(refTimer.current as NodeJS.Timeout);
    }
    refTimer.current = null;
  };

  const trigger = useCallback(() => {
    if (refTimer.current) return;
    refTimer.current = setTimeout(() => {
      refCallback.current();
      clear();
    }, refTimeout.current);
  }, []);

  useEffect(() => {
    refCallback.current = callback;
    refTimeout.current = timeout;
  }, deps);

  useEffect(() => clear, []);

  return { clear, trigger };
};

export default useTimeout;
