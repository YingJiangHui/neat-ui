import { useCallback, useEffect, useRef, useState } from 'react';
import { BranchProps } from '@/Tree/tree-branch';
import useUpdateEffect from '@/hooks/useUpdateEffect';

export const useBranchLogic = (props: BranchProps) => {
  const { autoExpand, onChange } = props;
  const [isExpand, setIsExpand] = useState(autoExpand);
  const directoryRef = useRef<HTMLUListElement | null>(null);

  const trigger = useCallback(() => {
    setIsExpand((isExpand) => !isExpand);
  }, []);
  useEffect(() => {
    if (autoExpand) {
      Object.assign(directoryRef.current?.style, {
        height: `auto`,
      });
    } else {
      Object.assign(directoryRef.current?.style, {
        height: `0px`,
      });
    }
  }, [autoExpand]);

  useUpdateEffect(() => {
    if (!directoryRef.current) return;
    if (isExpand) {
      Object.assign(directoryRef.current?.style, {
        height: 'auto',
      });
      const { height } = directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `0px`,
      });
      directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `${height}px`,
      });
    } else {
      const { height } = directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `${height}px`,
      });
      directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: '0px',
      });
    }
    onChange?.({});
  }, [isExpand]);

  const setHeightToAuto = () => {
    Object.assign(directoryRef.current?.style, {
      height: `auto`,
    });
  };

  return { isExpand, trigger, setHeightToAuto, directoryRef };
};

export default useBranchLogic;
