export const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: 'light',
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const themeMode = useMemo(
    () => (theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: theme }}>
      <MUIThemeProvider theme={themeMode}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;