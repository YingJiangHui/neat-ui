import React, {
  ButtonHTMLAttributes,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import useButtonLogic from '@/Button/useButtonLogic';
import { Loading } from '@/Loading';
import withDefaults from '@/utils/with-defaults';

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
export type ButtonTypes =
  | 'success'
  | 'error'
  | 'warning'
  | 'secondary'
  | 'default'
  | 'abort'
  | 'secondary-light'
  | 'success-light'
  | 'warning-light'
  | 'error-light';
export type NormalSizes = 'mini' | 'small' | 'medium' | 'large';
type Props = {
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
export type ButtonProps = typeof defaultProps &
  Props &
  HTMLAttributes<HTMLButtonElement>;
const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children, icon, loading } = props;
  const { buttonProps, theme, colors, sizes, cursors, reaction } =
    useButtonLogic(props);
  return (
    <>
      <button {...buttonProps}>
        <Loading.Container
          maskColor={colors.bg}
          iconColor={colors.color}
          loading={loading}
          opacity={1}
        >
          <div className="text">
            {icon} {children}
          </div>
        </Loading.Container>
      </button>
      <style jsx={true}>{`
        .button {
          outline: none;
          border-radius: ${theme.layout.radius};
          border-width: 1px;
          border-style: solid;
          border-color: ${colors.border};
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
          transition: ${theme.expressiveness.transition};
        }
        .button:hover,
        .button:focus {
          background: ${reaction.bg};
          border-color: ${reaction.border};
          color: ${reaction.color};
        }
        .button > .text {
          font-size: inherit;
        }
      `}</style>
    </>
  );
};
export default withDefaults(Button, defaultProps);
