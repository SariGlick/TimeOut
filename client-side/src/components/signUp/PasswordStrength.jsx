import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
const PasswordStrengthMeter = ({ password }) => {
  const PASSWORD_STRENGTH = {
    EMPTY: {
      key: 1,
      message: 'Weak password',
      color: 'red'
    },
    WEAK: {
      key: 2,
      message: 'Medium password',
      color: 'orange'
    },
    MEDIUM: {
      key: 3,
      message: 'Strong password',
      color: 'green'
    }
  };
  const calculatePasswordStrength = (password) => {
    if (!password) return PASSWORD_STRENGTH.EMPTY;
    if (password.length < 4) return PASSWORD_STRENGTH.WEAK;
    if (/[A-Za-z]/.test(password) && /[0-9]/.test(password) && password.length > 4) return PASSWORD_STRENGTH.MEDIUM;
    return PASSWORD_STRENGTH.WEAK;
  };
  const strength = calculatePasswordStrength(password);
  const { color, message } = strength; // הפקת צבע והודעה מקבועים
  return (
    <Box className="centered-container" sx={{width:"50%",marginLeft:"2%"}}>
      <LinearProgress
        variant="determinate"
        value={(strength.key / 3) * 100}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#D3D3D3',
          '& .MuiLinearProgress-bar': { backgroundColor: color }
        }}
      />
      <Box sx={{ mt: 1, color: color, marginRight:"34%" }}>
        {message}
      </Box>
    </Box>
  );
};
export default PasswordStrengthMeter;
