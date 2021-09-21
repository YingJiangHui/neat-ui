import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import useCalculateScrollBarWidth from './useCalculateScrollBarWidth';
import useTimeout from '@/hooks/useTimeout';
import mixExec from '@/utils/mixExec';
import useCounter from '@/hooks/useCounter';
import { ScrollProps } from '@/Scroll/scroll';
import useUpdateEffect from '@/hooks/useUpdateEffect';

type DivFunc = (
  props?: React.HTMLAttributes<HTMLDivElement>,
) => React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type ScrollContainer = {
  trackHeight?: number;
  scrollTop?: number;
  viewHeight?: number;
  scrollHeight?: number;
};

export type EventName =
  | 'onUpdatable'
  | 'onUpdating'
  | 'onDisUpdate'
  | 'onCompleted'
  | 'onEnd'
  | 'onCanceledUpdating'
  | 'onUpGlideLoad';

export type PullDownStatusToOtherMap<Type> = Type extends 'Event'
  ? { [key in EventName]: () => void }
  : {
      [key in PullDownStatus]: Exclude<
        EventName,
        'onCanceledUpdating' | 'onUpGlideLoad'
      >;
    };

export type PullDownEventMap = Partial<PullDownStatusToOtherMap<'Event'>>;

export type ableStatus = 'updatable' | 'updating' | 'completed' | 'none';
export type disStatus = 'disUpdate' | 'none';
export type PullDownStatus = ableStatus | disStatus;

export interface GetScrollPropsMap {
  getScrollContainerProps: DivFunc;
  getScrollBarProps: DivFunc;
  getPullingAnimationProps: DivFunc;
  getTrackProps: DivFunc;
}
export interface useScrollProps extends ScrollProps {}

const lifeCycleMap: { disUpdate: disStatus[]; updatable: ableStatus[] } = {
  updatable: ['updatable', 'updating', 'completed', 'none'],
  disUpdate: ['disUpdate', 'none'],
};

const pullDownStatusToEventName: PullDownStatusToOtherMap<'EventName'> = {
  updatable: 'onUpdatable',
  updating: 'onUpdating',
  disUpdate: 'onDisUpdate',
  completed: 'onCompleted',
  none: 'onEnd',
};

const statusList: PullDownStatus[] = Array.from(
  new Set(
    lifeCycleMap['updatable'].concat(lifeCycleMap['disUpdate'] as ableStatus[]),
  ),
);

const useScrollLogic = (props: useScrollProps) => {
  const {
    updatableDistance = 100,
    waitingDistance = 60,
    maxPullDownDistance = 9999,
    completedStayTime = 0,
    upGlideLoading = false,
    pullDownUpdating = false,
    enablePullDownUpdate = false,
    enableUpGlideLoad = false,
    onPullDownUpdate,
    onUpGlideLoad: _onUpGlideLoad,
  } = props;
  const { count, increment, reset } = useCounter();
  const completedWaitTimer = useTimeout(completedStayTime, () => {
    setPullTop(0);
  });
  const barVisibleTimer = useTimeout(5000, () => {
    setBarVisible(false);
  });
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const [pullTop, _setPullTop] = useState(0);
  const [status, _setStatus] = useState<PullDownStatus>('none');
  const [lifeLine, setLifeLine] = useState<(disStatus | ableStatus)[]>([]);
  const [barVisible, setBarVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const barFirstClientYRef = useRef(0);
  const barFirstTopRef = useRef(0);
  const isPullingRef = useRef(true);
  const touchLastClientYRef = useRef(0);
  const touchTriggerRef = useRef(false);
  const lastScrollTop = useRef<number>(0);

  useUpdateEffect(() => {
    const onStatusEventMap: Omit<
      PullDownStatusToOtherMap<'Event'>,
      'onCanceledUpdating' | 'onUpGlideLoad'
    > = {
      onUpdatable,
      onUpdating,
      onDisUpdate,
      onCompleted,
      onEnd,
    };
    onStatusEventMap[pullDownStatusToEventName[status]](); // 内部事件
    onPullDownUpdate?.(status);
  }, [status, touchTriggerRef.current]);
  useEffect(() => {
    setStatus(lifeLine[count]);
  }, [lifeLine, count]);
  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectstart', onSelectStart);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectstart', onSelectStart);
    };
  }, []);

  useEffect(() => {
    if (status === 'updating' && !pullDownUpdating) increment();
  }, [pullDownUpdating]);

  useEffect(() => {
    if (!upGlideLoading) setBarPosState(getSizes());
  }, [upGlideLoading]);

  const { scrollBarWidth } = useCalculateScrollBarWidth();
  const animationStyle = useMemo(
    () => ({
      transition: touchTriggerRef.current ? `none 0s` : `transform 0.25s`,
    }),
    [touchTriggerRef.current],
  );
  const updatableRate = useMemo(
    () =>
      Math.floor(
        pullTop >= updatableDistance
          ? 100
          : (pullTop / updatableDistance) * 100,
      ),
    [pullTop, updatableDistance],
  );

  const getSizes = () => {
    const { current } = containerRef;
    return {
      current,
      viewHeight: current?.clientHeight || 0,
      scrollHeight: current?.scrollHeight || 0,
      scrollTop: current?.scrollTop || 0,
      trackHeight: trackRef.current?.clientHeight || 0,
    };
  };
  const setBarPosState = ({
    scrollTop,
    viewHeight,
    scrollHeight,
    trackHeight,
  }: ScrollContainer) => {
    setBarVisible(true);

    barVisibleTimer.trigger();
    setBarHeight(
      viewHeight === scrollHeight
        ? 0
        : calculateBarHeight({ trackHeight, viewHeight, scrollHeight }),
    );
    setBarTop(calculateBarTop({ scrollTop, trackHeight, scrollHeight }));
  };

  const setStatus = (status: PullDownStatus) => {
    status &&
      _setStatus((s) => {
        if (
          s === 'updating' &&
          (status === 'updatable' || status === 'disUpdate')
        )
          if (statusList.indexOf(status) === -1) return s;
        return status;
      });
  };
  const setPullTop = (number: number) => {
    if (number > maxPullDownDistance) number = maxPullDownDistance;
    if (number < 0) number = 0;
    _setPullTop(number);
  };
  const setBarTop = (number: number) => {
    if (number <= 0) return;
    const { scrollHeight, viewHeight } = getSizes();
    const scrollBarMaxTop =
      ((scrollHeight - viewHeight) / scrollHeight) * viewHeight;
    if (number >= scrollBarMaxTop) return;
    _setBarTop(number);
  };

  const calculateBarHeight = ({
    trackHeight = 0,
    viewHeight = 0,
    scrollHeight = 0,
  }: ScrollContainer) => {
    return (trackHeight * viewHeight) / scrollHeight;
  };
  const calculateBarTop = ({
    scrollTop = 0,
    trackHeight = 0,
    scrollHeight = 0,
  }: ScrollContainer) => {
    return (scrollTop * trackHeight) / scrollHeight;
  };

  const onMouseUpBar = () => {
    isDraggingRef.current = false;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    const { scrollHeight, viewHeight, current } = getSizes();
    if (!isDraggingRef.current) return;
    const delta = e.clientY - barFirstClientYRef.current;
    const newScrollBarTop = delta + barFirstTopRef.current;
    setBarTop(newScrollBarTop);
    current!.scrollTop = (scrollHeight * newScrollBarTop) / viewHeight;
  };
  const onMouseDownBar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDraggingRef.current = true;
    barFirstClientYRef.current = e.clientY;
    barFirstTopRef.current = barTop;
  };
  const onSelectStart = (e: Event) => {
    if (isDraggingRef.current) e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchTriggerRef.current = true;
    const { scrollTop } = getSizes();
    isPullingRef.current = scrollTop === 0;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const { scrollTop } = getSizes();
    isPullingRef.current = scrollTop === 0;
    const delta = e.targetTouches[0].clientY - touchLastClientYRef.current;
    touchLastClientYRef.current = e.targetTouches[0].clientY;
    if (!isPullingRef.current && pullTop === 0) return;
    const newPullTop = delta + pullTop;
    setPullTop(newPullTop);
    setStatus(newPullTop >= updatableDistance ? 'updatable' : 'disUpdate');
    if (delta > 0) {
      // 用户正在下拉
      completedWaitTimer.clear();
    }
  };
  const onTouchEnd = () => {
    touchTriggerRef.current = false;
    if (isPullingRef.current) {
      reset();
      if (pullTop >= updatableDistance) {
        setLifeLine(lifeCycleMap['updatable']);
      } else {
        setLifeLine(lifeCycleMap['disUpdate']);
      }
    }
  };

  const onUpGlideLoad = ({
    scrollTop,
    scrollHeight,
    viewHeight,
  }: {
    scrollTop: number;
    scrollHeight: number;
    viewHeight: number;
  }) => {
    if (
      scrollTop + viewHeight + 300 >= scrollHeight &&
      lastScrollTop.current < scrollTop &&
      enableUpGlideLoad &&
      !upGlideLoading
    )
      _onUpGlideLoad?.();
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.preventDefault();
    const containerInfo = getSizes();
    const { scrollTop, scrollHeight, viewHeight } = containerInfo;
    if (pullTop !== 0) e.currentTarget.scrollTop = 0;
    setBarPosState(containerInfo);
    onUpGlideLoad({ scrollTop, scrollHeight, viewHeight });
    lastScrollTop.current = scrollTop;
  };
  const onTransitionEnd = () => {
    if (status === 'completed' || status === 'disUpdate') {
      increment();
    }
  };
  const onSelect = (e: SyntheticEvent<HTMLDivElement>) => e.preventDefault();

  const onUpdatable = () => {
    if (!touchTriggerRef.current) increment();
  };
  const onDisUpdate = () => {
    if (!touchTriggerRef.current) setPullTop(0);
  };
  const onUpdating = () => {
    setPullTop(waitingDistance);
  };
  const onCompleted = () => {
    if (completedStayTime !== 0) {
      completedWaitTimer.trigger();
    } else {
      setPullTop(0);
    }
  };

  const onEnd = () => {};

  const downGlideUpdated = () => {
    if (status === 'updating') increment();
  };

  const getScrollContainerProps: DivFunc = (props) => {
    const ref = containerRef;
    const _onTouchStart = enablePullDownUpdate ? onTouchStart : () => {};
    const _onTouchMove = enablePullDownUpdate ? onTouchMove : () => {};
    const _onTouchEnd = enablePullDownUpdate ? onTouchEnd : () => {};
    return {
      ...props,
      style: {
        right: -scrollBarWidth,
        transform: `translateY(${pullTop}px)`,
        ...animationStyle,
        ...props?.style,
      },
      onTouchStart: mixExec(props?.onTouchStart)(_onTouchStart),
      onTouchMove: mixExec(props?.onTouchMove)(_onTouchMove),
      onTouchEnd: mixExec(props?.onTouchEnd)(_onTouchEnd),
      onScroll: mixExec(props?.onScroll)(onScroll),
      onSelect: mixExec(props?.onSelect)(onSelect),
      onTransitionEnd: mixExec(props?.onTransitionEnd)(onTransitionEnd),
      ref,
    };
  };
  const getScrollBarProps: DivFunc = (props) => {
    return {
      style: {
        transform: `translateY(${barTop}px)`,
        height: barHeight,
        opacity: barVisible ? 1 : 0,
        ...props?.style,
        ...props?.style,
      },
      onMouseDown: mixExec(props?.onMouseDown)(onMouseDownBar),
      ...props,
    };
  };
  const getPullingAnimationProps: DivFunc = (props) => {
    return {
      style: {
        transform: `translateY(${pullTop - 30}px)`,
        ...animationStyle,
        ...props?.style,
      },
      ...props,
    };
  };
  const getTrackProps: DivFunc = (props) => {
    return {
      style: { width: scrollBarWidth },
      ref: trackRef,
      ...props,
    };
  };

  return {
    getScrollPropsMap: {
      getScrollContainerProps,
      getScrollBarProps,
      getPullingAnimationProps,
      getTrackProps,
    },
    updatableRate,
    status,
  };
};

export default useScrollLogic;
