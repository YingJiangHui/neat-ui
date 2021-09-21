import React, {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import useButtonLogic from '@/Button/useButtonLogic';
import { Loading } from '@/Loading';
import Ripple from '@/shared/animation/Ripple';

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
  /**
   * @description       按钮宽度自动随字体的宽度变化
   * @description.zh-CN 按钮宽度自动随字体的宽度变化
   * @default           false
   */
  auto?: boolean;
  /**
   * @description       边框阴影
   * @description.zh-CN 边框阴影
   * @default           false
   */
  shadow?: boolean;
  /**
   * @description       按钮大小
   * @description.zh-CN 按钮大小
   * @default           medium
   */
  size?: NormalSizes;
  /**
   * @description       按钮类型
   * @description.zh-CN 按钮类型
   * @default           default
   */
  type?: ButtonTypes;
  /**
   * @description       按钮icon
   * @description.zh-CN 按钮icon
   * @default           -
   */
  icon?: React.ReactNode;
  /**
   * @description       触发按钮加载
   * @description.zh-CN 触发按钮加载
   * @default           false
   */
  loading?: boolean;
  /**
   * @description       定义元素html类型
   * @description.zh-CN 定义元素html类型
   * @default           "button"
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /**
   * @description       禁用按钮
   * @description.zh-CN 禁用按钮
   * @default           false
   */
  disabled?: boolean;
  /**
   * @description       颜色反色（样式）
   * @description.zh-CN 颜色反色（样式）
   * @default           false
   */
  ghost?: boolean;
};
export type ButtonProps = Partial<typeof defaultProps> &
  Props &
  HTMLAttributes<HTMLButtonElement>;
const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref) => {
    const { children, icon, loading } = { ...defaultProps, ...props };
    const {
      buttonProps,
      theme,
      colors,
      sizes,
      cursors,
      reaction,
      pressing,
      buttonRef,
      pos,
      getBoundingClientRect,
    } = useButtonLogic(props, ref);

    return (
      <>
        <button {...buttonProps} ref={buttonRef}>
          <Ripple
            visible={pressing}
            x={pos.x}
            y={pos.y}
            r={getBoundingClientRect()?.width || 0}
          />
          <Loading.Container
            maskColor={colors.bg}
            iconColor={colors.color}
            loading={loading}
            opacity={1}
          >
            <div className="text">
              {React.isValidElement(icon) &&
                React.cloneElement(icon, { fill: colors.color })}{' '}
              {children}
            </div>
          </Loading.Container>
        </button>
        <style jsx={true}>{`
          .button {
            overflow: hidden;
            position: relative;
            outline: none;
            border-width: 1px;
            border-style: solid;
            text-align: center;
            user-select: none;
          }

          .button > .text {
            font-size: inherit;
          }
        `}</style>
        <style jsx={true}>{`
          .button {
            position: relative;
            border-radius: ${theme.layout.radius};
            border-color: ${colors.border};
            background-color: ${colors.bg};
            color: ${colors.color};
            font-size: ${sizes.size};
            width: ${sizes.width};
            min-width: ${sizes.minWidth};
            padding: 0 ${sizes.padding};
            line-height: ${sizes.lineHeight};
            pointer-events: ${cursors.pointerEvents};
            cursor: ${cursors.cursor};
            font-family: ${theme.font.sans};
            transition: ${theme.expressiveness.transition};
          }

          .button:hover,
          .button:focus {
            background: ${reaction.bg};
            border-color: ${reaction.border};
            color: ${reaction.color};
          }
        `}</style>
        <style jsx global>{`
          .button:hover .neat-icon,
          .button:focus .neat-icon {
            fill: ${reaction.color};
          }
        `}</style>
      </>
    );
  },
);
export default Button;
