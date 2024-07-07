import React, { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, Theme } from '@mui/material';

interface ThemeContextProps {
  toggleColorMode: () => void;
  setColorMode: (mode: 'light' | 'dark') => void;
  mode: 'light' | 'dark';
  theme: Theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const setColorMode = useCallback((newMode: 'light' | 'dark') => {
    setMode(newMode);
  }, []);

  const value = useMemo(() => ({
    toggleColorMode,
    setColorMode,
    mode,
    theme,
  }), [toggleColorMode, setColorMode, mode, theme]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
