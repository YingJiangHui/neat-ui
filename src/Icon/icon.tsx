import React, { FC, PropsWithChildren, SVGAttributes } from 'react';
import '../importSvg';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {
  size: 'medium',
};

type IconProps = {
  color: string;
  size: 'small' | 'medium' | 'large';
};

const sizes: { [key in IconProps['size']]: number } = {
  small: 14,
  medium: 16,
  large: 18,
};

type Props = typeof defaultProps & IconProps & SVGAttributes<SVGElement>;

export const Icon: FC<PropsWithChildren<Props>> = ({
  size,
  color,
  name,
  ...rest
}) => {
  return (
    <svg {...rest} className="icon" style={{ fill: color, ...rest.style }}>
      <use xlinkHref={'#' + name} />
      <style jsx={true}>{`
        .icon {
          width: ${sizes[size]}px;
          height: ${sizes[size]}px;
        }
      `}</style>
    </svg>
  );
};

export default withDefaults(Icon, defaultProps);
