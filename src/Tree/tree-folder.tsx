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
  defaultFold: false,
};

export type TreeFolder = {
  name: string;
  value?: Directors;
  defaultFold?: boolean;
  onChange?: () => void;
};

export type TreeFolderProps = typeof defaultProps &
  TreeFolder &
  React.HTMLAttributes<HTMLDivElement>;
const TreeFolder: FC<PropsWithChildren<TreeFolderProps>> = (props) => {
  const { children, name, value, onChange, ...rest } = props;
  const { isFold, treeFolderProps, trigger } = useTreeFolderLogic(props);
  const directoryRef = useRef<HTMLUListElement | null>(null);
  const [childrenChange, setChildrenChange] = useState({});
  useEffect(() => {
    if (!directoryRef.current) return;
    if (isFold) {
      Object.assign(directoryRef.current?.style, {
        height: 'auto',
      });
      const { height } = directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `0px`,
      });
      directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `${height}px`,
      });
    } else {
      const { height } = directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: `${height}px`,
      });
      directoryRef.current?.getBoundingClientRect();
      Object.assign(directoryRef.current?.style, {
        height: '0px',
      });
    }
    onChange?.();
  }, [isFold, childrenChange]);
  return (
    <div {...rest}>
      <div
        onClick={() => {
          trigger();
        }}
        className="folder"
      >
        <i>{isFold ? <Icon name={'bottom'} /> : <Icon name={'right'} />}</i>
        {name}
      </div>
      <ul ref={(node) => (directoryRef.current = node)} className="directory">
        {value ? (
          <Tree
            onChange={() => {
              Object.assign(directoryRef.current?.style, {
                height: `auto`,
              });
            }}
            value={value}
          />
        ) : (
          React.cloneElement(children, {
            onChange: () => {
              Object.assign(directoryRef.current?.style, {
                height: `auto`,
              });
            },
          })
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
