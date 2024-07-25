import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff', // רקע כללי בעמוד
            paper: '#000000',   // רקע ההדר
        },
        text: {
            primary: '#000000', // צבע הטקסט
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000000', // רקע כללי בעמוד
            paper: '#303030',   // רקע ההדר

        },
        text: {
            primary: '#ffffff', // צבע הטקסט
        },
    },
});
