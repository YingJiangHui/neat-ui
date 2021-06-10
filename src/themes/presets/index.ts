export interface ThemePalette {
  grayscale_1: string;
  grayscale_2: string;
  grayscale_3: string;
  grayscale_4: string;
  grayscale_5: string;
  grayscale_6: string;
  grayscale_7: string;
  grayscale_8: string;
  background: string;
  foreground: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeFont {
  sans: string;
  mono: string;
}

export interface NeatUITheme {
  type: 'dark' | 'light';
  palette: ThemePalette;
  font: ThemeFont;
}
