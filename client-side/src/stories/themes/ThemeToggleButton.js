import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import GenericButton from '../Button/GenericButton';

const ThemeToggleButton = () => {
    const { toggleTheme, currentTheme } = useContext(ThemeContext);

    return (
        <GenericButton
            size='small'
            label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
            onClick={toggleTheme}
            variant="contained"
        />
    );
};

export default ThemeToggleButton;
