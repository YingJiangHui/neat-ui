import { useCallback, useMemo, useState } from 'react';
import { TreeFolderProps } from '@/Tree/tree-folder';
import classnames from '@/shared/classnames';

export const useTreeFolderLogic = (props: TreeFolderProps) => {
  const { defaultFold, className } = props;
  const [isFold, setIsFold] = useState(defaultFold);
  const treeFolderProps = useMemo<TreeFolderProps>(
    () => ({
      className: classnames('tree-folder-container', className),
      ...props,
    }),
    [],
  );
  const trigger = useCallback(() => {
    setIsFold((isFold) => !isFold);
  }, []);
  return { isFold, treeFolderProps, trigger };
};

export default useTreeFolderLogic;
