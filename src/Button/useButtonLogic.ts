import React, {
  ForwardedRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from '@/shared/classnames';
import { useTheme } from '../hooks/use-theme';
import {
  getButtonColors,
  getButtonCursor,
  getButtonHoverColors,
  getButtonSizes,
} from './styles';
import Button from '@/Button/button';
import useMouseDownPosition from '@/hooks/use-mouse-down-position';
type ButtonComponentProps = Parameters<typeof Button>[0];
export const useButtonLogic = (
  props: ButtonComponentProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const {
    className,
    auto,
    type,
    shadow,
    htmlType,
    size,
    disabled,
    loading,
    ghost,
    ...rest
  } = props;
  const theme = useTheme();
  const mouseDownPos = useMouseDownPosition();
  const buttonProps: HTMLAttributes<HTMLButtonElement> = useMemo(
    () => ({
      ...rest,
      disabled,
      className: classnames(className, `button`),
      onMouseDown: (e) => {
        setPressing(true);
        rest.onMouseDown?.(e);
      },
      onMouseUp: (e) => {
        setPressing(false);
        rest.onMouseUp?.(e);
      },
      type: htmlType,
    }),
    [props],
  );
  const sizes = useMemo(() => getButtonSizes(size, auto), [size, auto]);
  const colors = useMemo(
    () => getButtonColors(theme.palette, props),
    [theme, props],
  );
  const cursors = useMemo(() => getButtonCursor({ disabled, loading }), []);
  const reaction = useMemo(
    () => getButtonHoverColors(theme.palette, props),
    [theme, props],
  );
  const [pressing, setPressing] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(ref, () => ({
    ...(buttonRef.current as HTMLButtonElement),
  }));
  const pos = useMemo(() => {
    if (pressing)
      return {
        x: mouseDownPos.x - (buttonRef.current?.getBoundingClientRect().x || 0),
        y: mouseDownPos.y - (buttonRef.current?.getBoundingClientRect().y || 0),
      };
    return { x: 0, y: 0 };
  }, [mouseDownPos, buttonRef]);
  const getBoundingClientRect = useCallback(
    () => buttonRef.current?.getBoundingClientRect(),
    [buttonRef],
  );
  return {
    theme,
    buttonProps,
    colors,
    sizes,
    cursors,
    reaction,
    pressing,
    buttonRef,
    pos,
    getBoundingClientRect,
  };
};

export default useButtonLogic;
