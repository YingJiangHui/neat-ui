import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import withDefaults from '@/utils/with-defaults';
import useTreeFolderLogic from '@/Tree/use-tree-folder-logic';
import { Directors } from '@/Tree/tree';
import { Tree } from '@/Tree/index';
import { Icon } from '@/Icon';
const defaultProps = {
  defaultExpand: true,
};

export type TreeFolder = {
  name: string;
  value?: Directors;
  defaultExpand?: boolean;
  onChange?: () => void;
};

export type TreeFolderProps = typeof defaultProps &
  TreeFolder &
  React.HTMLAttributes<HTMLDivElement>;
const TreeFolder: FC<PropsWithChildren<TreeFolderProps>> = (props) => {
  const { children, name, value, ...rest } = props;
  const { isExpand, trigger, setHeightToAuto, directoryRef } =
    useTreeFolderLogic(props);

  return (
    <div {...rest}>
      <div
        onClick={() => {
          trigger();
        }}
        className="folder"
      >
        <i>{isExpand ? <Icon name={'bottom'} /> : <Icon name={'right'} />}</i>
        {name}
      </div>
      <ul ref={(node) => (directoryRef.current = node)} className="directory">
        {value ? (
          <Tree
            onChange={() => {
              setHeightToAuto();
            }}
            value={value}
          />
        ) : (
          React.cloneElement(
            children as React.DetailedReactHTMLElement<any, HTMLElement>,
            {
              onChange: () => {
                setHeightToAuto();
              },
            },
          )
        )}
      </ul>

      <style jsx={true}>{`
        .folder {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .folder {
          > i {
            margin-right: 6px;
          }
        }
        .directory {
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

export default withDefaults(TreeFolder, defaultProps);
