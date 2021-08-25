import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import Leaf, { LeafProps } from '@/Tree/tree-leaf';
import Branch, { BranchProps } from '@/Tree/tree-branch';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import { TreeContext } from '@/Tree/tree-wrapper';
const defaultProps = {};

export type TreeCompose = { key: string | number } & (
  | (BranchProps & { type: 'branch' })
  | (LeafProps & { type: 'leaf' })
);

export type Forest = Array<TreeCompose>;

export interface TreeEvent {
  nativeEvent: React.MouseEvent<HTMLDivElement, MouseEvent>;
  node: TreeCompose;
  selected: boolean;
  selectedNodes: TreeCompose[];
}

interface Tree extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  value?: Forest;
  onChange?: () => void;
  autoExpand?: boolean;
  onSelect?: (keys: (string | number)[], e: TreeEvent | {}) => void;
  multiple?: boolean;
}

export type TreeProps = Partial<typeof defaultProps> & Tree;

const Tree: FC<PropsWithChildren<TreeProps>> = ({
  value,
  children,
  onChange,
  autoExpand,
  onSelect,
  ...rest
}) => {
  const { updateSelectedObject, selectObject } = useContext(TreeContext);
  useUpdateEffect(() => {
    onSelect?.(selectObject.keys, selectObject.e);
  }, [selectObject]);
  const renderTree = useCallback(() => {
    return value?.map((props) => {
      const { type, ...leafOrBranch } = props;
      return type === 'leaf' ? (
        <Leaf
          {...leafOrBranch}
          onClick={(e) => {
            updateSelectedObject(leafOrBranch.key, props, e);
          }}
        />
      ) : (
        <Branch
          {...leafOrBranch}
          onChange={onChange}
          autoExpand={autoExpand}
          onClick={(e) => {
            updateSelectedObject(leafOrBranch.key, props, e);
          }}
        />
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
export default Tree;
