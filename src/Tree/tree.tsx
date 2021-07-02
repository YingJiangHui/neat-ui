import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import withDefaults from '@/utils/with-defaults';
import TreeFile, { TreeFileProps } from '@/Tree/tree-file';
import TreeFolder, { TreeFolderProps } from '@/Tree/tree-folder';
const defaultProps = {};

export type Files = (
  | (TreeFolderProps & { type: 'directory' })
  | (TreeFileProps & { type: 'file' })
)[];

type TreeProps = {
  files?: Files;
};

type Props = typeof defaultProps & TreeProps & HTMLAttributes<HTMLDivElement>;
const Tree: FC<PropsWithChildren<Props>> = ({ files, children, ...rest }) => {
  const renderTree = useCallback(() => {
    return files?.map((file) =>
      file.type === 'file' ? <TreeFile {...file} /> : <TreeFolder {...file} />,
    );
  }, [files]);
  const renderChildren = useMemo(() => {
    return files ? renderTree() : children;
  }, [files, renderTree]);
  return <div {...rest}>{renderChildren}</div>;
};
const TreeWithDefaults = withDefaults(Tree, defaultProps);

export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};
