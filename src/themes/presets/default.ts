import { ThemePalette, NeatUITheme } from '@/themes/presets/index';
import { font } from '@/themes/presets/shared';

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
};

export const themes: NeatUITheme = {
  type: 'light',
  palette,
  font,
};

export default themes;
