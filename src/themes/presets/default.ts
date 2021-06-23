import {
  ThemePalette,
  NeatUITheme,
  Expressiveness,
} from '@/themes/presets/index';
import { defaultLayout, font } from '@/themes/presets/shared';

export const palette: ThemePalette = {
  grayscale_1: '#fafafa',
  grayscale_2: '#eaeaea',
  grayscale_3: '#aaa',
  grayscale_4: '#999',
  grayscale_5: '#888',
  grayscale_6: '#666',
  grayscale_7: '#444',
  grayscale_8: '#333',
  grayscale_9: '#111',
  background: '#fff',
  foreground: '#000',
  error: '#e00',
  success: '#0070f3',
  warning: '#f5a623',
  border: '#eaeaea',
};

export const layout = defaultLayout;

export const expressiveness: Expressiveness = {
  transition: '.25s',
};

export const themes: NeatUITheme = {
  type: 'light',
  palette,
  font,
  layout,
  expressiveness,
};

export default themes;
