import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ac6477',

    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',

    },
    text: {
      primary: '#000000',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff', // צבע הטקסט
      secondary: 'rgba(255, 255, 255, 0.7)'
    },
  },
});
