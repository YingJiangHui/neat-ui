import React, {
  cloneElement,
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
import { classnames } from '@/shared/classnames';

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
  /**
   * @description       接受一片森林
   * @description.zh-CN 接受一片森林
   * @default           -
   */
  value?: Forest;
  /**
   * @description       自动展开树组件
   * @description.zh-CN 自动展开树组件
   * @default           false
   */
  autoExpand?: boolean;
  /**
   * @description       选中一个结点时触发
   * @description.zh-CN 选中一个结点时触发
   * @default           -
   */
  onSelect?: (keys?: (string | number)[], e?: TreeEvent | {}) => void;
  /**
   * @description       同时选中多个结点
   * @description.zh-CN 同时选中多个结点
   * @default           false
   */
  multiple?: boolean;
  onChange: () => void;
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
  const { updateSelectedObject, selectObject, selectedKeysIncludeTo } =
    useContext(TreeContext) || {};
  useUpdateEffect(() => {
    onSelect?.(selectObject?.keys, selectObject?.e);
  }, [selectObject]);
  const renderTree = useCallback(() => {
    return value?.map((props) => {
      const { type, ...leafOrBranch } = props;
      return type === 'leaf' ? (
        <Leaf
          {...leafOrBranch}
          selected={selectedKeysIncludeTo?.(leafOrBranch.key)}
          onClick={(e) => {
            updateSelectedObject?.(leafOrBranch.key, props, e);
          }}
        />
      ) : (
        <Branch
          {...leafOrBranch}
          selected={selectedKeysIncludeTo?.(leafOrBranch.key)}
          onChange={onChange}
          autoExpand={autoExpand}
          onClick={(e) => {
            updateSelectedObject?.(leafOrBranch.key, props, e);
          }}
        />
      );
    });
  }, [value, selectObject]);

  const cloneChildren = () => {
    if (React.isValidElement(children))
      return Array.isArray(children)
        ? children.map(
            (
              children: React.ReactElement<
                any,
                string | React.JSXElementConstructor<any>
              >,
            ) =>
              cloneElement(children, {
                ...children?.props,
                onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  children?.props?.onClick?.(e);
                  children?.key &&
                    updateSelectedObject?.(children?.key, children?.props, e);
                },
              }),
          )
        : cloneElement(children, {
            ...children?.props,
            onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              children.props?.onClick?.(e);
              children.key &&
                updateSelectedObject?.(children.key, children?.props, e);
            },
          });
  };

  const renderChildren = useMemo(() => {
    return value ? renderTree() : cloneChildren();
  }, [value, renderTree, children]);

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
