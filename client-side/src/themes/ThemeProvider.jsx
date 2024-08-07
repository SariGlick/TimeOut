import React, { createContext, useMemo, useState, useContext , useEffect  } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: 'light',
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const themeMode = useMemo(
    () => ({
      toggleTheme: () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      },
      currentTheme: theme,
    }),
    [theme]
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={themeMode}>
      <MUIThemeProvider theme={currentTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
