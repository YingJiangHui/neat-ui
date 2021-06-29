import React, { FC, useEffect, useMemo, useState } from 'react';
import withDefaults from '@/utils/with-defaults';
import useTimeout from '@/hooks/useTimeout';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import useFirstTrigger from '@/hooks/useFirstTrigger';

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
  const interval = 5;
  const [renderable, setRenderable] = useState(visible);
  const [classes, setClasses] = useState('');
  const { reset, trigger, isFirstTriggerRef } = useFirstTrigger();
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
  const { trigger: enterTrigger, loading: enterLoading } = useTimeout(
    interval + timeout.enter,
    () => {
      onEnter();
    },
    [],
  );
  const { trigger: leaveTrigger, loading: leaveLoading } = useTimeout(
    interval + timeout.leave,
    () => {
      setClasses('');
      setRenderable(false);
      onLeave();
    },
    [],
  );
  const { trigger: intervalTrigger } = useTimeout(
    interval,
    () => {
      setClasses(`${name}-${status} ${name}-${status}-active`);
    },
    [],
  );

  const status = useMemo(() => (visible ? 'enter' : 'leave'), [visible]);
  useUpdateEffect(() => {
    if (enterLoading || leaveLoading) return;
    animation();
  }, [visible, enterLoading]);

  const animation = () => {
    if (visible) {
      // 避免用户按住按钮是一直触发定时器
      if (isFirstTriggerRef.current) {
        console.log('true');
        trigger();
        enterTrigger();
      }
    } else {
      console.log('false');
      reset();
      leaveTrigger();
    }
    setClasses(`${name}-${status}`);
    intervalTrigger();
  };

  useEffect(() => {
    if (visible && !renderable) setRenderable(true);
  }, [visible]);
  if (!React.isValidElement(children) || !renderable) return null;
  return React.cloneElement(children, {
    ...props,
    className: `${className || ''} ${children.props.className} ${classes}`,
  });
};

export default withDefaults(CSSTransition, defaultProps);
