import React, { useEffect, useRef, useState } from 'react';
import { TreeCompose, TreeEvent, TreeProps } from '@/Tree/tree';

interface SetRefFn<T, V> {
  (ref: { current: T }, key: string | number, value: V): void;
}
export const useTreeLogic = (props: TreeProps) => {
  const { multiple } = props;
  const [selectObject, setSelectObject] = useState<{
    keys: (string | number)[];
    e: TreeEvent | {};
  }>({ keys: [], e: {} });
  const selectMapRef = useRef<Record<string | number, TreeCompose> | null>(
    null,
  );
  useEffect(() => {
    selectMapRef.current = {};
  }, []);

  const updateSelectedObject = (
    key: string | number,
    selectObject: TreeCompose,
    nativeEvent: React.MouseEvent<any, MouseEvent>,
  ) => {
    if (!selectMapRef.current) return;

    let selected;

    if (key in selectMapRef.current) {
      delete selectMapRef.current[key];
      selected = false;
    } else {
      if (multiple) {
        selectMapRef.current[key] = selectObject;
      } else {
        selectMapRef.current = { [key]: selectObject };
      }
      selected = true;
    }
    setSelectObject({
      keys: Object.keys(selectMapRef.current),
      e: {
        nativeEvent,
        key,
        selected,
        node: selectObject,
        selectedNodes: Object.values(selectMapRef.current),
      },
    });
  };
  return { updateSelectedObject, selectObject };
};
