import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

type TreeFolderProps = {};

type Props = typeof defaultProps & TreeFolderProps & HTMLAttributes<any>;
const TreeFolder: FC<PropsWithChildren<Props>> = ({ ...rest }) => {
  return <div {...rest}></div>;
};

export default withDefaults(TreeFolder, defaultProps);
