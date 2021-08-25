import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

type Leaf = { name: string };

export type LeafProps = typeof defaultProps & Leaf & HTMLAttributes<any>;
const Leaf: FC<PropsWithChildren<LeafProps>> = ({
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

export default withDefaults(Leaf, defaultProps);
