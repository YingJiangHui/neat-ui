import React, {
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { useTheme } from '@/hooks';
import { Icon } from '@/Icon';

const defaultProps = {};

interface Props {
  /**
   * @description       默认选中
   * @description.zh-CN 默认选中
   * @default           false
   */
  defaultChecked?: boolean;
  /**
   * @description       选中（受控）
   * @description.zh-CN 选中（受控）
   * @default           false
   */
  checked?: boolean;
  /**
   * @description       禁用
   * @description.zh-CN 禁用
   * @default           false
   */
  disabled?: boolean;
  /**
   * @description       未知的
   * @description.zh-CN 未知的
   * @default           false
   */
  indeterminate?: boolean;
}

type CheckboxProps = Partial<typeof defaultProps> &
  Props &
  InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<PropsWithChildren<CheckboxProps>> = (props) => {
  const { defaultChecked, disabled, checked, indeterminate, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const idRef = useRef<string>(Math.random().toString(32).substr(2));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  useEffect(() => {
    Object.assign(inputRef.current, {
      indeterminate,
    });
  }, [indeterminate]);

  return (
    <div className="neat-checkbox-wrapper">
      <input
        {...rest}
        ref={inputRef}
        id={idRef.current}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        type="checkbox"
        className={'checkbox'}
      />
      <label htmlFor={idRef.current} className={'checkbox-ui'}>
        <Icon
          name={'line'}
          className={'checkbox-inner-icon'}
          fill={theme.palette.success}
        />
        <Icon
          name={'true'}
          className={'checkbox-inner-icon'}
          fill={theme.palette.background}
        />
      </label>
      <label htmlFor={idRef.current} />

      <style jsx>{`
        .checkbox:checked + .checkbox-ui {
          color: ${theme.palette.success};
          background: ${theme.palette.success};
        }

        .checkbox-ui {
          background-color: ${theme.palette.background};
        }

        .checkbox:indeterminate + .checkbox-ui {
          background: ${theme.palette.background};
        }
      `}</style>

      <style global jsx>
        {`
          .checkbox:checked + .checkbox-ui .true-icon {
            opacity: 1;
          }

          .checkbox:indeterminate + .checkbox-ui .line-icon {
            opacity: 1;
          }

          .checkbox + .checkbox-ui .checkbox-inner-icon {
            opacity: 0;
            transition: 0.1s;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>

      <style jsx>{`
        .neat-checkbox-wrapper {
          display: inline-block;
        }

        .checkbox + .checkbox-ui {
          transition: color 0.1s, background-color 0.2s;
        }

        .checkbox-ui {
          cursor: pointer;
          position: relative;
          display: inline-block;
          width: 20px;
          max-width: 20px;
          height: 20px;
          max-height: 20px;
          border: 1px solid rgba(0, 0, 0, 0);
          border-radius: 4px;
          box-sizing: border-box;
          box-shadow: inset 0 1px, inset 1px 0, inset -1px 0, inset 0 -1px;
          background-clip: content-box;
          color: #d0d0d5;
          -webkit-transition: color 0.2s, background-color 0.1s;
          transition: color 0.2s, background-color 0.1s;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          vertical-align: -5px;
          *vertical-align: 0;
          overflow: hidden;
        }

        input[type='checkbox'] {
          visibility: hidden;
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Checkbox;
