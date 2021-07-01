import React, { FC, HTMLAttributes, PropsWithChildren, useState } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTreeFolderLogic from '@/Tree/use-tree-folder-logic';
import CSSTransition from '@/shared/CSSTransition';

const defaultProps = {
  defaultFold: false,
};

type Props = {
  defaultFold?: boolean;
  name: string;
};

export type TreeFolderProps = typeof defaultProps &
  Props &
  React.HTMLAttributes<HTMLDivElement>;
const TreeFolder: FC<PropsWithChildren<TreeFolderProps>> = (props) => {
  const { children, name, ...rest } = props;
  const { isFold, treeFolderProps, trigger } = useTreeFolderLogic(props);
  return (
    <div {...treeFolderProps}>
      <div onClick={trigger} className="folder">
        {name}
      </div>
      <CSSTransition visible={isFold}>
        <div className="directory">{children}</div>
      </CSSTransition>

      <style jsx={true}>{`
        .folder {
          cursor: pointer;
        }
        .directory {
          margin: 1rem 0 1rem 2rem;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(TreeFolder, defaultProps);
