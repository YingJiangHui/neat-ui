import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import classnames from '@/shared/classnames';
import { useTheme } from '@/hooks';

const defaultProps = {
  selected: false,
};

interface Leaf extends HTMLAttributes<HTMLElement> {
  name?: string;
  selected?: boolean;
}

export type LeafProps = typeof defaultProps & Leaf;
const Leaf: FC<PropsWithChildren<LeafProps>> = ({
  children,
  name,
  selected,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <li {...rest} className={classnames(rest.className)}>
      <span className={classnames(selected && 'leaf-selected', 'leaf-name')}>
        {' '}
        {name || children}
      </span>
      <style jsx>{`
        li {
          cursor: pointer;
          list-style: none;
        }
        .leaf-name {
          padding-left: 0.2em;
          padding-right: 0.2em;
          transition: 0.25s;
        }
        .leaf-selected {
          background: ${theme.palette.grayscale_2};
        }
      `}</style>
    </li>
  );
};

export default withDefaults(Leaf, defaultProps);
