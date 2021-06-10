import { NeatUITheme } from '@/themes/presets';
import React from 'react';
import { themes } from '@/themes';
export const ThemeContext = React.createContext(themes.getDefaultPreset());

export const useTheme = (): NeatUITheme => React.useContext(ThemeContext);

export default useTheme;
