import { useMemo } from 'react';
import classnames from '@/shared/classnames';
import { useTheme } from '../hooks/use-theme';
import {
  getButtonColors,
  getButtonCursor,
  getButtonHoverColors,
  getButtonSizes,
} from '@/Button/styles';
import Button from '@/Button/button';
type ButtonComponentProps = Parameters<typeof Button>[0];
export const useButtonLogic = (props: ButtonComponentProps) => {
  const {
    className,
    auto,
    type,
    shadow,
    htmlType,
    size,
    disabled,
    loading,
    ...rest
  } = props;
  const theme = useTheme();
  const buttonProps = useMemo(
    () => ({
      className: classnames(className, `button`),
      type: htmlType,
      ...rest,
    }),
    [],
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
  return { theme, buttonProps, colors, sizes, cursors, reaction };
};

export default useButtonLogic;
