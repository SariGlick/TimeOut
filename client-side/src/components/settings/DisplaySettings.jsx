import React from 'react';
import { useTheme } from '../../themes/ThemeProvider';
import { FormControl, InputLabel, MenuItem, Select, Box} from '@mui/material';

const DisplaySettings = () => {
  const { toggleTheme, currentTheme } = useTheme();

  const handleThemeChange = (event) => {
    toggleTheme();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <FormControl fullWidth>
      <InputLabel>Theme</InputLabel>
        <select
          value={currentTheme}
          label="Theme"
          onChange={handleThemeChange}
        >
          <menuitem value="light"></menuitem>
          <menuitem value="dark"></menuitem>
        </select>
      </FormControl>
    </Box>
  );
};
export default DisplaySettings;
