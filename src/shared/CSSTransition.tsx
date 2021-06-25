import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '@/utils/with-defaults';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  name?: string;
  timeout: number | { enter: number; leave: number };
}

const defaultProps = {
  visible: false,
  className: '',
  timeout: 250,
  name: 'transition',
};

// .classPrefix-enter 进入
// .classPrefix-enter-active 最终的过渡效果
// .classPrefix-level
// .classPrefix-level-active
type CSSTransitionProps = Props &
  typeof defaultProps &
  React.AllHTMLAttributes<any>;
const CSSTransition: FC<React.PropsWithChildren<CSSTransitionProps>> = ({
  visible,
  name,
  children,
  className,
  timeout: _timeout,
  ...props
}) => {
  const [renderable, setRenderable] = useState(visible);
  const [classes, setClasses] = useState('');
  const timeout = useMemo(() => {
    let enter: number, leave: number;
    if (timeout && typeof _timeout !== 'number') {
      enter = _timeout.enter;
      leave = _timeout.leave;
    } else if (typeof _timeout === 'number') {
      enter = leave = _timeout;
    } else {
      enter = leave = 0;
    }
    return {
      enter,
      leave,
    };
  }, [_timeout]);
  const status = useMemo(() => (visible ? 'enter' : 'leave'), [visible]);
  const animation = () => {
    setClasses(`${name}-${status}`);
    const timer = window.setTimeout(() => {
      setClasses(`${name}-${status} ${name}-${status}-active`);
      clearTimeout(timer);
    }, 30);
    return timer;
  };

  const clearComponent = () => {
    const timer = window.setTimeout(() => {
      // 设置了clearTime执行
      setClasses('');
      setRenderable(false);
      clearTimeout(timer);
    }, 30 + timeout.leave);
    return timer;
  };
  useEffect(() => {
    if (visible && !renderable) setRenderable(true);
    const timer = animation();
    let clearTimer = 0;
    // leave时隐藏，enter时这个定时器没有效果
    if (!visible) {
      clearTimer = clearComponent();
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, [visible]);

  if (!React.isValidElement(children) || !renderable) return null;
  return React.cloneElement(children, {
    ...props,
    className: `${className || ''} ${children.props.className} ${classes}`,
  });
};

export default withDefaults(CSSTransition, defaultProps);
