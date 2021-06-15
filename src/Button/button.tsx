import React, {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import useButtonLogic from '@/Button/useButtonLogic';
import { Loading } from '@/Loading';

const defaultProps = {
  htmlType: 'button',
  shadow: false,
  auto: false,
  size: 'medium',
  type: 'default',
  icon: '',
  disabled: false,
  loading: false,
  ghost: false,
};
export type GhostButtonTypes =
  | 'secondary-light'
  | 'success-light'
  | 'warning-light'
  | 'error-light';
export type DefaultButtonTypes =
  | 'success'
  | 'error'
  | 'warning'
  | 'secondary'
  | 'default'
  | 'abort';
export type ButtonTypes = GhostButtonTypes | DefaultButtonTypes;
export type NormalSizes = 'mini' | 'small' | 'medium' | 'large';
export type ButtonProps = {
  auto?: boolean;
  shadow?: boolean;
  size?: NormalSizes;
  type?: ButtonTypes;
  icon?: React.ReactNode;
  loading?: boolean;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  ghost?: boolean;
};

export type Props = typeof defaultProps &
  ButtonProps &
  HTMLAttributes<HTMLButtonElement>;
export const Button: FC<PropsWithChildren<Props>> = (props) => {
  const { children, icon, loading } = props;
  const { buttonProps, theme, colors, sizes, cursors } = useButtonLogic(props);

  return (
    <>
      <button {...buttonProps}>
        <Loading.Container loading={loading} opacity={1}>
          <div className="text">
            {icon} {children}
          </div>
        </Loading.Container>
      </button>
      <style jsx>{`
        .button {
          outline: none;
          border-radius: ${theme.layout.radius};
          border: 1px solid ${colors.border};
          background-color: ${colors.bg};
          color: ${colors.color};
          font-size: ${sizes.size};
          width: ${sizes.width};
          min-width: ${sizes.minWidth};
          padding: 0 ${sizes.padding};
          line-height: ${sizes.lineHeight};
          cursor: ${cursors.cursor};
          pointer-events: ${cursors.pointerEvents};
          font-family: ${theme.font.sans};
          text-align: center;
        }
        .button > .text {
          font-size: inherit;
        }
      `}</style>
    </>
  );
};

export default Button;
