import React, { FC, PropsWithChildren, useContext } from 'react';
import withDefaults from '@/utils/with-defaults';
import useBranchLogic from '@/Tree/use-tree-branch-logic';
import { Forest } from '@/Tree/tree';
import Tree from './tree';
import { Icon } from '@/Icon';
import { TreeContext } from '@/Tree/tree-wrapper';
import { useTheme } from '@/hooks';
import { classnames } from '@/shared/classnames';
const defaultProps = {
  autoExpand: false,
};

export interface Branch extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: Forest;
  autoExpand?: boolean;
  onChange?: () => void;
}

export type BranchProps = typeof defaultProps & Branch;
const Branch: FC<PropsWithChildren<BranchProps>> = (props) => {
  const { children, name, value, onClick, className, ...rest } = props;
  const { isExpand, trigger, setHeightToAuto, directoryRef } =
    useBranchLogic(props);
  const { selectedKeysIncludeTo } = useContext(TreeContext);
  const theme = useTheme();
  const renderChildrenNode = () => {
    if (value)
      return (
        <Tree
          onChange={() => {
            setHeightToAuto();
          }}
          value={value}
        />
      );
    if (children)
      return React.cloneElement(
        children as React.DetailedReactHTMLElement<any, HTMLElement>,
        {
          onChange: () => {
            setHeightToAuto();
          },
        },
      );
    else return <></>;
  };
  console.log(className);
  return (
    <div {...rest}>
      <div
        onClick={(e) => {
          trigger();
          onClick?.(e);
        }}
        className={classnames(className, 'branch')}
      >
        <i>{isExpand ? <Icon name={'bottom'} /> : <Icon name={'right'} />}</i>
        {name}
      </div>
      <ul
        ref={(node) => (directoryRef.current = node)}
        className="tree-compose"
      >
        {renderChildrenNode()}
      </ul>

      <style jsx={true}>{`
        .branch {
          display: flex;
          align-items: center;
          cursor: pointer;
          background: ${selectedKeysIncludeTo('value')
            ? theme.palette.grayscale_1
            : 'none'};
        }
        .branch-selected {
          background: red;
        }
        .branch {
          > i {
            margin-right: 6px;
          }
        }
        .tree-compose {
          overflow: hidden;
          transition: height 300ms;
          margin: 0.5rem 0 0.5rem 1rem;
          min-height: 0;
        }
        ul {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(Branch, defaultProps);
