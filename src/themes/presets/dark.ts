import { ThemePalette, NeatUITheme } from '@/themes/presets/index';
import { font } from '@/themes/presets/shared';

export const palette: ThemePalette = {
  grayscale_1: '#111',
  grayscale_2: '#333',
  grayscale_3: '#444',
  grayscale_4: '#666',
  grayscale_5: '#888',
  grayscale_6: '#999',
  grayscale_7: '#eaeaea',
  grayscale_8: '#fafafa',
  background: '#000',
  foreground: '#fff',
  error: '#e00',
  success: '#0070f3',
  warning: '#f5a623',
};

export const themes: NeatUITheme = {
  type: 'dark',
  palette,
  font,
};

export default themes;
