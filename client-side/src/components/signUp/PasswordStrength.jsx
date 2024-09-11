
import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import './PasswordStrength.scss';
import { PASSWORD_STRENGTH } from '../../constants';

const PasswordStrengthMeter = ({ password }) => {
  
 const colors = {
  passwordStrength: {
      empty: '#f00', 
      weak: '#ffa500', 
      medium: '#008000', 
  }
};
  const calculatePasswordStrength = (password) => {
    if (!password) return PASSWORD_STRENGTH.EMPTY;
    if (password.length < 4) return PASSWORD_STRENGTH.WEAK;
    if (/[A-Za-z]/.test(password) && /[0-9]/.test(password) && password.length > 4) return PASSWORD_STRENGTH.MEDIUM;
    return PASSWORD_STRENGTH.WEAK;
  };
  const strength = calculatePasswordStrength(password);

  const { color, message } = strength;
  const strengthColor = colors.passwordStrength[color];
  const strengthClass = {
    [PASSWORD_STRENGTH.EMPTY.key]: 'weak',
    [PASSWORD_STRENGTH.WEAK.key]: 'medium',
    [PASSWORD_STRENGTH.MEDIUM.key]: 'strong',
  }[strength.key];
  return (
    <Box className="centered-container">
    <LinearProgress
      variant="determinate"
      value={(strength.key / 3) * 100}
      className={`password-strength-meter ${strengthClass}`}
    />
    <Box className="password-strength-message" sx={{ color: strengthColor }}>
      {message}
    </Box>
  </Box>
);
};
export default PasswordStrengthMeter;
