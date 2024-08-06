import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '../../themes/ThemeContext';

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return <Button onClick={toggleTheme}>Switch Theme</Button>;
};

export default ThemeToggleButton;
