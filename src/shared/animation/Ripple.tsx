import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';
import CSSTransition from '@/shared/CSSTransition';

const defaultProps = {
  visible: false,
  x: 0,
  y: 0,
  r: 10,
};

type RippleProps = {
  visible: boolean;
  x: number;
  y: number;
  r: number;
};

type Props = typeof defaultProps & RippleProps & HTMLAttributes<any>;
const Ripple: FC<PropsWithChildren<Props>> = ({
  visible,
  x,
  y,
  r,
  ...rest
}) => {
  return (
    <CSSTransition
      timeout={{ enter: 500, leave: 300 }}
      name="ripple"
      visible={visible}
    >
      <div {...rest} className="ripple">
        <style jsx>{`
          .ripple {
            left: ${x}px;
            top: ${y}px;
          }
        `}</style>
        <style jsx>{`
          .ripple {
            background: rgba(0, 0, 0, 0.03);
            width: ${r * 2}px;
            height: ${r * 2}px;
            transform-origin: top left;
            transform: translate(-50%, -50%);
            position: absolute;
            border-radius: 50%;
            transition: transform 500ms, opacity 300ms;
          }
          .ripple-enter {
            transform: scale(0) translate(-50%, -50%);
          }
          .ripple-enter-active {
            transform: scale(1) translate(-50%, -50%);
          }
          .ripple-leave {
            opacity: 1;
          }
          .ripple-leave-active {
            opacity: 0;
          }
        `}</style>
      </div>
    </CSSTransition>
  );
};

export default withDefaults(Ripple, defaultProps);
