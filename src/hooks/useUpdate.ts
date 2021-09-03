import { useState } from 'react';

export const useUpdate = () => {
  const [, setUpdate] = useState({});
  return () => {
    setUpdate({});
  };
};
