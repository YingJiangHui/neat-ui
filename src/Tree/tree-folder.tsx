import React, { FC, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTreeFolderLogic from '@/Tree/use-tree-folder-logic';
import CSSTransition from '@/shared/CSSTransition';
import { Directors } from '@/Tree/tree';
import { Tree } from '@/Tree/index';

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
    <div {...treeFolderProps}>
      <div onClick={trigger} className="folder">
        {name}
      </div>
      <CSSTransition visible={isFold}>
        <div className="directory">
          {value ? <Tree value={value} /> : children}
        </div>
      </CSSTransition>

      <style jsx={true}>{`
        .folder {
          cursor: pointer;
        }
        .directory {
          margin: 0.5rem 0 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(TreeFolder, defaultProps);
