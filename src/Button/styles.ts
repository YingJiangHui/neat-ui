import {
  ButtonProps,
  DefaultButtonTypes,
  GhostButtonTypes,
  NormalSizes,
} from '@/Button/button';
import { ThemePalette } from '@/themes/presets';
import loading from '@/Loading/loading';

function getGhostButtonColors(
  palette: ThemePalette,
  props: Partial<ButtonProps>,
) {
  // TODO
}

export type ButtonColors = { bg: string; border: string; color: string };
export const getButtonColors = (
  palette: ThemePalette,
  props: Partial<ButtonProps>,
) => {
  const colors: { [K in DefaultButtonTypes]: ButtonColors } = {
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
  const ghost =
    props.type?.indexOf('-light') !== -1 &&
    getGhostButtonColors(palette, props);
  if (ghost) {
    return ghost[props.type as GhostButtonTypes];
  }
  return colors[props.type as DefaultButtonTypes] || colors.default;
};
export type ButtonSizes = {
  width: string;
  minWidth: string;
  lineHeight: string;
  height: string;
  padding: string;
  size: string;
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
