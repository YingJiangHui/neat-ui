import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTimeout from '@/hooks/useTimeout';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  name?: string;
  timeout?: number | { enter: number; leave: number };
  onEnter: () => void;
  onLeave: () => void;
}

const defaultProps = {
  visible: false,
  className: '',
  name: 'transition',
  onEnter: () => {},
  onLeave: () => {},
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
  onEnter,
  onLeave,
  ...props
}) => {
  const interval = 30;
  const [renderable, setRenderable] = useState(visible);
  const [classes, setClasses] = useState('');
  const timeout = useMemo(() => {
    let enter: number, leave: number;
    if (_timeout && typeof _timeout !== 'number') {
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
  const {
    trigger: enterTrigger,
    clear: clearEnterTimer,
    loading: enterLoading,
  } = useTimeout(
    interval + timeout.enter,
    () => {
      onEnter();
    },
    [],
  );
  const { trigger: leaveTrigger, clear: clearLeaveTimer } = useTimeout(
    interval + timeout.leave,
    () => {
      onLeave();
    },
    [],
  );

  const status = useMemo(() => (visible ? 'enter' : 'leave'), [visible]);
  useEffect(() => {
    console.log(visible, enterLoading);
    if (!visible && enterLoading) return () => {};
    const timer = animation();
    return () => {
      clearTimeout(timer);
    };
  }, [enterLoading, visible]);
  const animation = () => {
    setClasses(`${name}-${status}`);
    if (visible) {
      enterTrigger();
    } else {
      leaveTrigger();
    }
    const timer = window.setTimeout(() => {
      setClasses(`${name}-${status} ${name}-${status}-active`);
      clearTimeout(timer);
    }, interval);
    return timer;
  };
  const clearComponent = () => {
    const timer = window.setTimeout(() => {
      // 设置了clearTime执行
      setClasses('');
      setRenderable(false);
      clearTimeout(timer);
    }, interval + timeout.leave);
    return timer;
  };
  useEffect(() => {
    if (visible && !renderable) setRenderable(true);

    let clearTimer = 0;
    // leave时隐藏，enter时这个定时器没有效果
    if (!visible) {
      clearTimer = clearComponent();
    }
    return () => {
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
