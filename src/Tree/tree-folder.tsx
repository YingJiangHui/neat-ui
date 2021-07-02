import React, { FC, HTMLAttributes, PropsWithChildren, useState } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTreeFolderLogic from '@/Tree/use-tree-folder-logic';
import CSSTransition from '@/shared/CSSTransition';
import { Files } from '@/Tree/tree';
import TreeFile from '@/Tree/tree-file';
import { Tree } from '@/Tree/index';

const defaultProps = {
  defaultFold: false,
};

export type Directory = {
  files?: Files;
  defaultFold?: boolean;
  name: string;
};

export type TreeFolderProps = typeof defaultProps &
  Directory &
  React.HTMLAttributes<HTMLDivElement>;
const TreeFolder: FC<PropsWithChildren<TreeFolderProps>> = (props) => {
  const { children, name, files, ...rest } = props;
  const { isFold, treeFolderProps, trigger } = useTreeFolderLogic(props);
  return (
    <div {...treeFolderProps}>
      <div onClick={trigger} className="folder">
        {name}
      </div>
      <CSSTransition visible={isFold}>
        <div className="directory">
          {files ? <Tree files={files} /> : children}
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
