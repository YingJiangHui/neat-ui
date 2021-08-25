import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import withDefaults from '@/utils/with-defaults';
import Leaf, { LeafProps } from '@/Tree/tree-leaf';
import Branch, { BranchProps } from '@/Tree/tree-branch';
const defaultProps = {
  autoExpand: false,
};

export type TreeCompose =
  | (BranchProps & { type: 'branch' })
  | (LeafProps & { type: 'leaf' });

export type Forest = Array<TreeCompose>;

type Tree = {
  value?: Forest;
  onChange?: () => void;
  autoExpand?: boolean;
};

type TreeProps = typeof defaultProps & Tree & HTMLAttributes<HTMLDivElement>;

const Tree: FC<PropsWithChildren<TreeProps>> = ({
  value,
  children,
  onChange,
  autoExpand,
  ...rest
}) => {
  const renderTree = useCallback(() => {
    return value?.map(({ type, ...leafOrBranch }) => {
      return type === 'leaf' ? (
        <Leaf {...leafOrBranch} />
      ) : (
        <Branch {...leafOrBranch} onChange={onChange} autoExpand={autoExpand} />
      );
    });
  }, [value]);
  const renderChildren = useMemo(() => {
    return value ? renderTree() : children;
  }, [value, renderTree]);
  return (
    <div {...rest} className="tree">
      {renderChildren}
      <style jsx>{`
        .tree {
          user-select: none;
        }
      `}</style>
    </div>
  );
};
const TreeWithDefaults = withDefaults(Tree, defaultProps);

export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof Leaf;
  Folder: typeof Branch;
};
