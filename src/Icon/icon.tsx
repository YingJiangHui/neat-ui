import React, { FC, PropsWithChildren, SVGAttributes } from 'react';
import '../importSvg';
import classnames from '@/shared/classnames';

type size = 'small' | 'medium' | 'large';

const defaultProps = {
  size: 'medium',
};

interface IconProps {
  size?: size;
  /**
   * @description       宽度1/24
   * @description.zh-CN 宽度1/24
   * @default           -
   */
  name: string;
}

type Props = Partial<typeof defaultProps> &
  IconProps &
  SVGAttributes<SVGElement>;
const sizeMap: { [key in size]: number } = {
  small: 8,
  medium: 10,
  large: 14,
};
export const Icon: FC<PropsWithChildren<Props>> = (props) => {
  const { size, style, name, className, ...rest } = {
    ...defaultProps,
    ...props,
  };
  return (
    <svg
      {...rest}
      className={classnames(className, 'neat-icon', `${name}-icon`)}
    >
      <use xlinkHref={'#' + name} />
      <style jsx={true}>{`
        .neat-icon {
          width: ${sizeMap[size as size]}px;
          height: ${sizeMap[size as size]}px;
        }
      `}</style>
    </svg>
  );
};

export default Icon;
