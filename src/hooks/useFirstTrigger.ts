import { useCallback, useRef } from 'react';

export const useFirstTrigger = () => {
  const firstTriggerRef = useRef(true);
  const trigger = useCallback(() => {
    firstTriggerRef.current = false;
  }, []);
  const reset = useCallback(() => {
    firstTriggerRef.current = true;
  }, []);
  return { isFirstTriggerRef: firstTriggerRef, trigger, reset };
};

export default useFirstTrigger;
