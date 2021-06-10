import React, { FC } from 'react';
import ThemeProvider, { ThemeProviderProps } from '@/provider/theme-provider';

export const NeatProvider: FC<React.PropsWithChildren<ThemeProviderProps>> = ({
  themes,
  themeType,
  children,
}) => {
  return (
    <ThemeProvider themes={themes} themeType={themeType}>
      {children}
    </ThemeProvider>
  );
};

export default NeatProvider;
