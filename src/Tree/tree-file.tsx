import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

type TreeFileProps = { name: string };

type Props = typeof defaultProps & TreeFileProps & HTMLAttributes<any>;
const TreeFile: FC<PropsWithChildren<Props>> = ({ ...rest }) => {
  return <div {...rest}></div>;
};

export default withDefaults(TreeFile, defaultProps);
