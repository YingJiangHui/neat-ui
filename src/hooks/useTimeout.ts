import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type UseTimeoutType = <T>(
  timeout: number,
  callback: () => void,
  deps?: T[],
) => { trigger: () => void; clear: () => void; loading: boolean };

const useTimeout: UseTimeoutType = (timeout, callback, deps = []) => {
  const refCallback = useRef<() => void>(() => {});
  const refTimer = useRef<number | NodeJS.Timeout | null>(null);
  const refTimeout = useRef<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const clear = useCallback(() => {
    if (window) window.clearTimeout(refTimer.current as number);
    else {
      clearTimeout(refTimer.current as NodeJS.Timeout);
    }
    refTimer.current = null;
  }, []);

  const trigger = useCallback(() => {
    if (refTimer.current) return;
    setLoading(true);
    refTimer.current = setTimeout(() => {
      refCallback.current();
      setLoading(false);
      clear();
    }, refTimeout.current);
  }, []);

  useEffect(() => {
    refCallback.current = callback;
    refTimeout.current = timeout;
  }, [...deps, timeout]);

  useEffect(() => clear, []);

  return { clear, trigger, loading };
};

export default useTimeout;
