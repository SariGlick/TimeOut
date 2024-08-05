import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const PasswordStrengthMeter = ({ password }) => {
 
  const calculatePasswordStrength = (password) => {
    if (!password) return 1; 

    if (password.length < 4) return 2;

    
    if (/[A-Za-z]/.test(password) && /[0-9]/.test(password) && password.length > 4) return 3;

    return 2;
  };

 
  const getStrengthColor = (score) => {
    switch (score) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green'; 
      default:
        return 'red'; 
    }
  };

  const strength = calculatePasswordStrength(password);
  const strengthColor = getStrengthColor(strength); 

  return (
    <Box sx={{width:"50%",marginLeft:"2%"}}>
      <LinearProgress
        variant="determinate"
        value={(strength / 3) * 100} 
        sx={{ 
         
          height: 10, 
          borderRadius: 5, 
          backgroundColor: '#d3d3d3', 
          '& .MuiLinearProgress-bar': { backgroundColor: strengthColor } 
        }} 
      />
      <Box sx={{ mt: 1, color: strengthColor,marginRight:"35%" }}>
        {strengthColor === 'red' ?  'weak password' : strengthColor === 'orange' ? ' meduim password' : ' strong password'}
      </Box>
    </Box>
  );
};

export default PasswordStrengthMeter;