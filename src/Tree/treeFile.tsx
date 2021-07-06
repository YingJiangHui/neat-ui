import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

type TreeFile = { name: string };

export type TreeFileProps = typeof defaultProps &
  TreeFile &
  HTMLAttributes<any>;
const TreeFile: FC<PropsWithChildren<TreeFileProps>> = ({
  children,
  name,
  ...rest
}) => {
  return (
    <li {...rest}>
      {name || children}
      <style jsx>{`
        li {
          list-style: none;
        }
      `}</style>
    </li>
  );
};

export default withDefaults(TreeFile, defaultProps);
