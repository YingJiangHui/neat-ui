import { HTMLAttributes, useMemo } from 'react';
import { Props } from '@/Button/button';
import classnames from '@/shared/classnames';
import { useTheme } from '../hooks/use-theme/use-theme';
import {
  getButtonColors,
  getButtonCursor,
  getButtonSizes,
} from '@/Button/styles';

export const useButtonLogic = (props: Props & HTMLAttributes<any>) => {
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
  const cursors = useMemo(() => getButtonCursor(disabled, loading), []);
  return { theme, buttonProps, colors, sizes, cursors };
};

export default useButtonLogic;
