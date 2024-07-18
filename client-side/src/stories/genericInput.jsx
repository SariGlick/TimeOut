import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import '../style/genericInput.scss';

const GenericInput = ({ label, type='text', value, onChange, size='medium', width='20%',
   icon: Icon, validation, ...rest }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let error = false;
  let helperText = '';

  if (validation && typeof validation === 'function') {
    const validationResult = validation(value);
    if (validationResult && validationResult.error) {
      error = true;
      helperText = validationResult.helperText || 'Invalid input';
    }
  }

  const inputStyle = {
    width: width
  };

  return (
    <div className="generic-input">
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
        size={size}
        error={error}
        helperText={helperText} 
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
          ...rest.InputProps,
        }}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string, 
  icon: PropTypes.elementType,
  validation: PropTypes.func,
};

export default GenericInput;
