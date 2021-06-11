import React, { FC, useEffect, useMemo, useState } from 'react';
import { ThemeType } from '@/themes/presets';
import { ThemeContext } from '@/hooks/use-theme';
import { ThemesConfig, ThemesContext } from '@/hooks/use-themes';
import Theme, { NeatUIUserTheme } from '@/themes/themes';

export interface ThemeProviderProps {
  themeType?: ThemeType;
  themes?: NeatUIUserTheme[];
}

export const ThemeProvider: FC<React.PropsWithChildren<ThemeProviderProps>> = ({
  themes,
  themeType,
  children,
}) => {
  const [allThemes, setAllThemes] = useState<ThemesConfig>({
    themes: Theme.getPresets(),
  });
  const currentTheme = useMemo(() => {
    const theme = allThemes.themes.filter(
      (theme) => theme.type === themeType,
    )[0];
    if (theme) return theme;
    return Theme.getDefaultPreset();
  }, [themeType, allThemes]);
  useEffect(() => {
    const customThemes =
      themes?.map((theme) => Theme.createTheme(currentTheme, theme)) || [];
    setAllThemes((allThemes) => ({
      themes: allThemes.themes.concat(customThemes),
    }));
  }, [themes]);

  return (
    <ThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>
        {children}
      </ThemeContext.Provider>
    </ThemesContext.Provider>
  );
};

export default ThemeProvider;
