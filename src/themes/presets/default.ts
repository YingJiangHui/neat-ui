import {
  ThemePalette,
  NeatUITheme,
  Expressiveness,
} from '@/themes/presets/index';
import { defaultLayout, font } from '@/themes/presets/shared';

export const palette: ThemePalette = {
  grayscale_1: '#fafafa',
  grayscale_2: '#eaeaea',
  grayscale_3: '#999',
  grayscale_4: '#888',
  grayscale_5: '#666',
  grayscale_6: '#444',
  grayscale_7: '#333',
  grayscale_8: '#111',
  background: '#fff',
  foreground: '#000',
  error: '#e00',
  success: '#0070f3',
  warning: '#f5a623',
  border: '#eaeaea',
};

export const layout = defaultLayout;

export const expressiveness: Expressiveness = {};

export const themes: NeatUITheme = {
  type: 'light',
  palette,
  font,
  layout,
  expressiveness,
};

export default themes;
