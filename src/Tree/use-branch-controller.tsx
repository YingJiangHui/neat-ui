import { useEffect, useRef, useState } from 'react';
import { TreeCompose, TreeEvent } from '@/Tree/tree';

type Props = {
  onMessage: () => void;
};
type BranchStatus = 'ALL' | 'PART' | 'NOT';
export const useBranchController = (props: Props) => {
  const { onMessage } = props;
  const [branchStatus, setBranchStatus] = useState<BranchStatus>('NOT');
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
};
