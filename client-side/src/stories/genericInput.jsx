import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/genericInput.scss';
import { TextField, InputAdornment } from '@mui/material';

const GenericInput = ({ 
  label, 
  type = 'text', 
  value = '', 
  onChange = () => {}, 
  size = 'medium', 
  width = '20%', 
  icon: Icon=null, 
  disabled= false,
  validation  = () => {}, 
  ...rest 
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (validation && typeof validation === 'function') {
      handleValidation(inputValue);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleValidation = (inputValue) => {
    const validationResult = validation(inputValue);
    if (validationResult && validationResult.error) {
      setError(true);
      setHelperText(validationResult.helperText || 'Invalid input');
    } else {
      setError(false);
      setHelperText(''); 
    }
  };

  const inputStyle = {
    width,
  };

  return (
    <div className="generic-input">
      <TextField
        label={label}
        type={type}
        value={inputValue}
        onChange={handleChange}
        size={size}
        error={error}
        disabled={disabled}
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
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string,
  icon: PropTypes.elementType,
  validation: PropTypes.func,
};

export default GenericInput;
