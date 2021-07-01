import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import TreeFile from '@/Tree/tree-file';
import TreeFolder from '@/Tree/tree-folder';

const defaultProps = {};

type TreeProps = {};

type Props = typeof defaultProps & TreeProps & HTMLAttributes<HTMLDivElement>;
const Tree: FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const TreeWithDefaults = withDefaults(Tree, defaultProps);

export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};
