import React, { FC, PropsWithChildren, SVGAttributes } from 'react';
import '../importSvg';
import withDefaults from '@/utils/with-defaults';

type size = 'small' | 'medium' | 'large';

const defaultProps = {
  size: 'medium',
};

interface IconProps {
  color?: string;
  size?: size;
  name: string;
}

type Props = typeof defaultProps & IconProps & SVGAttributes<SVGElement>;
const sizeMap: { [key in size]: number } = {
  small: 8,
  medium: 10,
  large: 14,
};
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
          width: ${sizeMap[size]}px;
          height: ${sizeMap[size]}px;
        }
      `}</style>
    </svg>
  );
};

export default withDefaults(Icon, defaultProps);
