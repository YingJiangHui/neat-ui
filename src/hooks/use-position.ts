import { useEffect, useState } from 'react';

export const useMouseDownPosition = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const onMouseDown = (e: MouseEvent) => {
    setPos({ x: e.pageX, y: e.pageY });
  };
  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);
  return pos;
};

export default useMouseDownPosition;
