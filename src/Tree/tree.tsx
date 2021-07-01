import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import TreeFile from '@/Tree/tree-file';
import TreeFolder from '@/Tree/tree-folder';

const defaultProps = {};
interface File {
  type: 'file';
  name: string;
}

interface Directory {
  type: 'directory';
  name: string;
  files?: Files;
}

type Files = (Directory | File)[];

type TreeProps = {
  files?: Files;
};

const files = [
  { type: 'file', name: 'file1' },
  {
    type: 'directory',
    name: 'folder1',
    files: [
      {
        type: 'directory',
        name: 'folder1',
        files: [{ type: 'file', name: 'file1' }],
      },
    ],
  },
];
type Props = typeof defaultProps & TreeProps & HTMLAttributes<HTMLDivElement>;
const Tree: FC<PropsWithChildren<Props>> = ({ files, children, ...rest }) => {
  const renderDirectory = (directory: Directory) => {
    if (files) {
      return (
        <TreeFolder name={directory.name}>
          {directory?.files?.map((file) => {
            if (file.type === 'directory') {
              renderDirectory(file);
            } else {
              return <TreeFile name={file.name} />;
            }
          })}
        </TreeFolder>
      );
    }
  };
  return <div {...rest}>{children}</div>;
};
const TreeWithDefaults = withDefaults(Tree, defaultProps);

export default TreeWithDefaults as typeof TreeWithDefaults & {
  File: typeof TreeFile;
  Folder: typeof TreeFolder;
};
