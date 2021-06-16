import { ButtonProps, ButtonTypes, NormalSizes } from '@/Button/button';
import { ThemePalette } from '@/themes/presets';
import hexToRgba from 'hex-to-rgba';

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
      color: palette.success,
      border: palette.success,
      bg: palette.background,
    },
    warning: {
      color: palette.warning,
      border: palette.warning,
      bg: palette.background,
    },
    error: {
      color: palette.error,
      border: palette.error,
      bg: palette.background,
    },
    secondary: {
      color: palette.foreground,
      border: palette.foreground,
      bg: palette.background,
    },
  };
  return colors[type] || null;
};

export const getButtonColors = (
  palette: ThemePalette,
  props: Partial<ButtonProps>,
) => {
  const colors: { [K in ButtonTypes]?: ButtonColors } = {
    default: {
      bg: palette.background,
      border: palette.border,
      color: palette.grayscale_5,
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff',
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff',
    },
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff',
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.grayscale_5,
    },
  };
  const withoutLightType = props.type?.replace('-light', '') as ButtonTypes;
  if (props.ghost) {
    return (
      getButtonGhostColors(palette, withoutLightType) ||
      (colors.default as ButtonColors)
    );
  }
  return colors[props.type as ButtonTypes] || (colors.default as ButtonColors);
};

export const getButtonSizes = (size: NormalSizes = 'medium', auto: boolean) => {
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

export const getButtonCursor = (
  disabled: boolean,
  loading: boolean,
): { cursor: string; pointerEvents: string } => {
  if (disabled) {
    return {
      cursor: 'not-allowed',
      pointerEvents: 'none',
    };
  }
  if (loading) {
    return {
      cursor: 'default',
      pointerEvents: 'none',
    };
  }
  return {
    cursor: 'pointer',
    pointerEvents: 'auto',
  };
};

export const getButtonGhostHoverColors = (
  palette: ThemePalette,
  type: ButtonTypes,
) => {
  const colors: { [k in ButtonTypes]?: ButtonColors } = {
    error: {
      bg: palette.error,
      border: palette.error,
      color: '#fff',
    },
    warning: {
      bg: palette.warning,
      border: palette.warning,
      color: '#fff',
    },
    success: {
      bg: palette.success,
      border: palette.success,
      color: '#fff',
    },
    secondary: {
      bg: palette.foreground,
      border: palette.foreground,
      color: palette.background,
    },
  };
  return colors[type] || null;
};

export const getButtonHoverColors = (
  palette: ThemePalette,
  props: ButtonProps,
) => {
  const colors: {
    [K in ButtonTypes]: Omit<ButtonColors, 'color'> & { color?: string };
  } = {
    default: {
      bg: palette.background,
      border: palette.foreground,
    },
    error: {
      bg: palette.background,
      border: palette.error,
      color: palette.error,
    },
    warning: {
      bg: palette.background,
      border: palette.warning,
      color: palette.warning,
    },
    success: {
      bg: palette.background,
      border: palette.success,
      color: palette.success,
    },
    secondary: {
      bg: palette.background,
      border: palette.foreground,
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
      bg: hexToRgba(palette.background, 0.8),
      border: 'transparent',
    },
  };

  if (props.ghost) {
    return (
      getButtonGhostHoverColors(palette, props.type as ButtonTypes) ||
      colors.default
    );
  }

  return colors[props.type as ButtonTypes] || colors.default;
};
