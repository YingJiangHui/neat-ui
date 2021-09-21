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
  selected: false,
};

export interface Branch extends React.HTMLAttributes<any> {
  name?: string;
  value?: Forest;
  autoExpand?: boolean;
  onChange?: () => void;
  selected?: boolean;
}

export type BranchProps = Partial<typeof defaultProps> & Branch;
const Branch: FC<PropsWithChildren<BranchProps>> = (props) => {
  const {
    children,
    name,
    value,
    onClick,
    autoExpand,
    className,
    selected,
    ...rest
  } = props;
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
          autoExpand={autoExpand}
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
  return (
    <div {...rest}>
      <div className={classnames(className, 'branch')}>
        <span onClick={trigger} className={'open-icon'}>
          {isExpand ? <Icon name={'bottom'} /> : <Icon name={'right'} />}
        </span>
        <span
          onClick={onClick}
          className={classnames(selected && 'branch-selected', 'branch-name')}
        >
          {name}
        </span>
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
        }
        .branch > span {
          padding-left: 0.2em;
          padding-right: 0.2em;
        }
        .branch-name {
          transition: 0.25s;
        }
        .branch-selected {
          background: ${theme.palette.grayscale_2};
        }
        .open-icon {
          padding-right: 6px;
        }
        .tree-compose {
          overflow: hidden;
          transition: height 300ms;
          margin: 0.2rem 0 0.2rem 1rem;
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
