import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import withDefaults from '@/utils/with-defaults';
import TreeFile, { TreeFileProps } from '@/Tree/treeFile';
import TreeFolder, { TreeFolderProps } from '@/Tree/tree-folder';
const defaultProps = {};

export type Directory =
  | (TreeFolderProps & { type: 'directory' })
  | (TreeFileProps & { type: 'file' });

export type Directors = Array<Directory>;

type Tree = {
  value?: Directors;
};

type TreeProps = typeof defaultProps & Tree & HTMLAttributes<HTMLDivElement>;

const Tree: FC<PropsWithChildren<TreeProps>> = ({
  value,
  children,
  ...rest
}) => {
  const renderTree = useCallback(() => {
    return value?.map((file) =>
      file.type === 'file' ? <TreeFile {...file} /> : <TreeFolder {...file} />,
    );
  }, [value]);
  const renderChildren = useMemo(() => {
    return value ? renderTree() : children;
  }, [value, renderTree]);
  return <div {...rest}>{renderChildren}</div>;
};
const TreeWithDefaults = withDefaults(Tree, defaultProps);

export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};
