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
const IconComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { size, color, name, ...rest } = props;
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

const Icon = withDefaults(IconComponent, defaultProps);

export { Icon };

export default Icon;
