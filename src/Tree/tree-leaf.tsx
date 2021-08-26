import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

interface Leaf extends HTMLAttributes<any> {
  name: string;
}

export type LeafProps = typeof defaultProps & Leaf;
const Leaf: FC<PropsWithChildren<LeafProps>> = ({
  children,
  name,
  ...rest
}) => {
  const onClick = (e: React.MouseEvent<any, MouseEvent>) => {
    // e.stopPropagation()
    rest.onClick?.(e);
  };
  return (
    <li {...rest} onClick={onClick}>
      {name || children}
      <style jsx>{`
        li {
          list-style: none;
        }
        .leaf-selected {
          background: red;
        }
      `}</style>
    </li>
  );
};

export default withDefaults(Leaf, defaultProps);
