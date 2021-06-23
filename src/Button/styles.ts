import { ButtonProps, ButtonTypes, NormalSizes } from '@/Button/button';
import { ThemePalette } from '@/themes/presets';
import hexToRgba from 'hex-to-rgba';
import { PartialSome } from '@/utils/types';

export type ButtonColors = { bg: string; border: string; color: string };
export type ButtonSizes = {
  width: string;
  minWidth: string;
  lineHeight: string;
  height: string;
  padding: string;
  size: string;
};

const getButtonGhostColors = (palette: ThemePalette, type: ButtonTypes) => {
  const colors: { [K in ButtonTypes]?: ButtonColors } = {
    success: {
      bg: palette.background,
      color: palette.success,
      border: palette.success,
    },
    warning: {
      bg: palette.background,
      color: palette.warning,
      border: palette.warning,
    },
    error: {
      bg: palette.background,
      color: palette.error,
      border: palette.error,
    },
    secondary: {
      bg: palette.background,
      color: palette.foreground,
      border: palette.foreground,
    },
  };
  return colors[type];
};

export const getButtonColors = (
  palette: ThemePalette,
  props: Partial<ButtonProps>,
) => {
  const colors: { [K in ButtonTypes]?: ButtonColors } = {
    default: {
      bg: palette.background,
      color: palette.grayscale_5,
      border: palette.border,
    },
    success: {
      bg: palette.success,
      color: '#fff',
      border: palette.success,
    },
    warning: {
      bg: palette.warning,
      color: '#fff',
      border: palette.warning,
    },
    error: {
      bg: palette.error,
      color: '#fff',
      border: palette.error,
    },
    secondary: {
      bg: palette.foreground,
      color: palette.background,
      border: palette.foreground,
    },
    abort: {
      bg: 'transparent',
      color: palette.grayscale_5,
      border: 'transparent',
    },
  };

  const defaultColors = colors.default;
  const withoutLightType = props.type?.replace('-light', '') as ButtonTypes;

  return (
    (props.ghost
      ? getButtonGhostColors(palette, withoutLightType)
      : colors[withoutLightType as ButtonTypes]) ||
    (defaultColors as ButtonColors)
  );
};

export const getButtonSizes = (
  size: NormalSizes = 'medium',
  auto?: boolean,
) => {
  const getMinWidth = (width: string) => (auto ? '' : width);
  const getWidth = () => (auto ? 'auto' : 'max-content');
  const sizes: { [K in NormalSizes]: ButtonSizes } = {
    mini: {
      width: getWidth(),
      minWidth: getMinWidth('0'),
      height: '1.5rem',
      lineHeight: '1.5rem',
      padding: '1.5em',
      size: '.825rem',
    },
    small: {
      width: getWidth(),
      minWidth: getMinWidth('10em'),
      height: '2rem',
      lineHeight: '2rem',
      padding: '1.5em',
      size: '.85rem',
    },
    medium: {
      width: getWidth(),
      minWidth: getMinWidth('12.5em'),
      height: '2.5rem',
      lineHeight: '2.5rem',
      padding: '1.5em',
      size: '0.875rem',
    },
    large: {
      width: getWidth(),
      minWidth: getMinWidth('14.5em'),
      height: '2.8rem',
      lineHeight: '2.8rem',
      padding: '1.5em',
      size: '1rem',
    },
  };
  return sizes[size];
};
export type CursorStyle = { cursor: string; pointerEvents: string };
export const getButtonCursor = ({
  disabled,
  loading,
}: {
  disabled?: boolean;
  loading?: boolean;
}): CursorStyle => {
  const cursorStyles: [boolean | undefined, CursorStyle][] = [
    [disabled, { cursor: 'not-allowed', pointerEvents: 'none' }],
    [loading, { cursor: 'not-allowed', pointerEvents: 'none' }],
  ];

  for (let cursorStyle of cursorStyles)
    if (cursorStyle[0]) return cursorStyle[1];

  return { cursor: 'pointer', pointerEvents: 'auto' };
};

export const getButtonGhostHoverColors = (
  palette: ThemePalette,
  type: ButtonTypes,
) => {
  const colors: { [k in ButtonTypes]?: ButtonColors } = {
    error: {
      bg: palette.error,
      color: '#fff',
      border: palette.error,
    },
    warning: {
      bg: palette.warning,
      color: '#fff',
      border: palette.warning,
    },
    success: {
      bg: palette.success,
      color: '#fff',
      border: palette.success,
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
  };
  return colors[type];
};

export const getButtonHoverColors = (
  palette: ThemePalette,
  props: Partial<ButtonProps>,
) => {
  const buttonColor = getButtonColors(palette, props);
  const colors: {
    [K in ButtonTypes]: PartialSome<ButtonColors, 'color' | 'border'>;
  } = {
    default: {
      bg: palette.background,
      border: palette.foreground,
    },
    error: {
      bg: palette.background,
      color: palette.error,
    },
    warning: {
      bg: palette.background,
      color: palette.warning,
    },
    success: {
      bg: palette.background,
      color: palette.success,
    },
    secondary: {
      bg: palette.background,
      color: palette.foreground,
    },
    abort: {
      bg: palette.grayscale_1,
      border: 'transparent',
    },
    'error-light': {
      bg: hexToRgba(palette.error, 0.8),
      border: 'transparent',
    },
    'success-light': {
      bg: hexToRgba(palette.success, 0.8),
      border: 'transparent',
    },
    'warning-light': {
      bg: hexToRgba(palette.warning, 0.8),
      border: 'transparent',
    },
    'secondary-light': {
      bg: hexToRgba(palette.foreground, 0.8),
      border: 'transparent',
    },
  };

  const hoverButtonColors: { [K in ButtonTypes]: ButtonColors } = (
    Object.keys(colors) as ButtonTypes[]
  ).reduce(
    (m, key) => ({ ...m, [key]: { ...buttonColor, ...colors[key] } }),
    {} as { [K in ButtonTypes]: ButtonColors },
  );

  return (
    (props.ghost
      ? getButtonGhostHoverColors(palette, props.type!)
      : hoverButtonColors[props.type!]) || colors.default
  );
};

// 第三方API
type Fn1 = (n: number) => number;
const api1 = (fn: Fn1) => {
  const n = 0;
  fn(n);
};
const fn = (n) => {
  // 无法推断n的类型，隐士的具有any
  // code...
  return n;
};
api1(fn);
