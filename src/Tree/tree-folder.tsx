import React, { FC, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTreeFolderLogic from '@/Tree/use-tree-folder-logic';
import CSSTransition from '@/shared/CSSTransition';
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
};

export type TreeFolderProps = typeof defaultProps &
  TreeFolder &
  React.HTMLAttributes<HTMLDivElement>;
const TreeFolder: FC<PropsWithChildren<TreeFolderProps>> = (props) => {
  const { children, name, value, ...rest } = props;
  const { isFold, treeFolderProps, trigger } = useTreeFolderLogic(props);
  return (
    <div {...rest}>
      <div onClick={trigger} className="folder">
        <i>{isFold ? <Icon name={'bottom'} /> : <Icon name={'right'} />}</i>
        {name}
      </div>
      <CSSTransition name="directory" visible={isFold} timeout={250}>
        <ul className="directory">
          {value ? <Tree value={value} /> : children}
        </ul>
      </CSSTransition>

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
          margin: 0.5rem 0 0.5rem 1rem;
          transition: height 300ms;
          min-height: 0;
        }
        .directory-enter {
          overflow: hidden;
          height: 0;
          margin-top: 0;
          margin-bottom: 0;
        }

        .directory-enter-active {
          height: 50px;
        }

        .directory-leave {
          height: 0;
          overflow: hidden;
          margin-top: 0;
          margin-bottom: 0;
        }
        .directory-leave-active {
          height: 0;
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
