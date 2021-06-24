import React, { FC, useEffect, useMemo, useState } from 'react';
import withDefaults from '@/utils/with-defaults';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  name?: string;
}

const defaultProps = {
  visible: false,
  enterTime: 60,
  leaveTime: 60,
  clearTime: 250,
  className: '',
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
  enterTime,
  leaveTime,
  clearTime,
  children,
  className,
  ...props
}) => {
  const [renderable, setRenderable] = useState(visible);
  const [classes, setClasses] = useState('');
  const status = useMemo(() => (visible ? 'enter' : 'leave'), [visible]);
  const time = useMemo(
    () => (visible ? enterTime : leaveTime),
    [visible, enterTime, leaveTime],
  );
  const animation = () => {
    setClasses(`${name}-${status}`);

    const timer = window.setTimeout(() => {
      setClasses(`${name}-${status} ${name}-${status}-active`);
      clearTimeout(timer);
    }, time);
    return timer;
  };

  const clearComponent = () => {
    const timer = window.setTimeout(() => {
      // 设置了clearTime执行
      setClasses('');
      setRenderable(false);
      clearTimeout(timer);
    }, clearTime);
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
