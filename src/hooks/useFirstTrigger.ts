import { useRef } from 'react';

export const useFirstTrigger = () => {
  const firstTriggerRef = useRef(true);
  const trigger = () => {
    firstTriggerRef.current = false;
  };
  const reset = () => {
    firstTriggerRef.current = true;
  };
  return { isFirstTriggerRef: firstTriggerRef, trigger, reset };
};

export default useFirstTrigger;
