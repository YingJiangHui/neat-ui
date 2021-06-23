export interface ThemePalette {
  grayscale_1: string;
  grayscale_2: string;
  grayscale_3: string;
  grayscale_4: string;
  grayscale_5: string;
  grayscale_6: string;
  grayscale_7: string;
  grayscale_8: string;
  grayscale_9: string;
  background: string;
  foreground: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeFont {
  sans: string;
  mono: string;
}
export interface Expressiveness {
  transition: string;
}
export interface Layout {
  gap: string;
  gapNegative: string;
  gapHalf: string;
  gapHalfNegative: string;
  gapQuarter: string;
  gapQuarterNegative: string;
  radius: string;
}

export type ThemeType = 'dark' | 'light' | string;

export interface NeatUITheme {
  type: ThemeType;
  palette: ThemePalette;
  font: ThemeFont;
  layout: Layout;
  expressiveness: Expressiveness;
}
