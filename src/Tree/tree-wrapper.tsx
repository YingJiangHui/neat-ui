import React, { createContext, FC } from 'react';
import { useTreeLogic } from '@/Tree/use-tree-logic';
import withDefaults from '@/utils/with-defaults';
import Tree, { TreeProps } from '@/Tree/tree';
import Leaf from '@/Tree/tree-leaf';
import Branch from '@/Tree/tree-branch';

const defaultProps = {
  autoExpand: false,
  multiple: false,
};

export const TreeContext = createContext<ReturnType<typeof useTreeLogic>>(null);

const TreeWrapper: FC<TreeProps> = (props) => {
  const { ...rest } = { ...defaultProps, ...props };

  return (
    <TreeContext.Provider value={useTreeLogic(rest)}>
      <Tree {...rest} />
    </TreeContext.Provider>
  );
};

const TreeWithDefaults = withDefaults(TreeWrapper, defaultProps);
export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof Leaf;
  Folder: typeof Branch;
};
