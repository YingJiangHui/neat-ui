import React from 'react';
import { getPresets } from '@/themes/themes';
import { NeatUITheme } from '@/themes/presets';

export interface ThemesConfig {
  themes: NeatUITheme[];
}
const themesConfig: ThemesConfig = {
  themes: getPresets(),
};
export const ThemesContext = React.createContext(themesConfig);

export const useThemes = (): ThemesConfig => React.useContext(ThemesContext);
export default useThemes;
