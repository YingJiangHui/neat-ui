import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

export type File = { name: string };

export type TreeFileProps = typeof defaultProps & File & HTMLAttributes<any>;
const TreeFile: FC<PropsWithChildren<TreeFileProps>> = ({ name, ...rest }) => {
  return <div {...rest}>{name}</div>;
};

export default withDefaults(TreeFile, defaultProps);
