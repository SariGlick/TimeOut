import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Button, Checkbox, FormControlLabel } from '@mui/material';
import { noop } from 'lodash';

import { INVALID_INPUT_MESSAGE } from './constants';
import './genericInput.scss';

const GenericInput = ({
  label,
  type = 'text',
  value = '',
  onChange = noop,
  size = 'medium',
  width = '20%',
  icon: Icon = null,
  disabled = false,
  accept,
  min,
  max,
  name,
  validation = noop,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    handleValidation(inputValue);
  }, [inputValue]);
  

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (type === 'number') {
      newValue = parseFloat(newValue);
    } else if (type === 'checkbox') {
      newValue = e.target.checked;
    }

    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleValidation = (inputValue) => {
    const validationResult = validation(inputValue);
    if (validationResult && validationResult.error) {
      setError(true);
      setHelperText(validationResult.helperText || INVALID_INPUT_MESSAGE);
    } else {
      setError(false);
      setHelperText('');
    }
  };

  const inputStyle = {
    width,
  };

  return (
    <>
      {type === 'file' ? (
        <div className="file-upload" style={inputStyle}>
          <Button
            component="label"
            size={size}
            disabled={disabled}
            className='generic-input-file'
          >
            {label}
            <input type='file' onChange={onChange} id='hidenInput' disabled={disabled} accept={accept} />
          </Button>
          {error && <div className="helper-text error">{helperText}</div>}
        </div>
      ) : type === 'checkbox' ? (
        <div className="generic-input-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={inputValue}
                onChange={handleChange}
                disabled={disabled}
                {...rest}
              />
            }
            label={label}
          />
          {error && <div className="helper-text error">{helperText}</div>}
        </div>
      ) : (
        <div className="generic-input">

          <TextField
            label={label}
            type={type}
            name={name}
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
            inputProps={{
              min,
              max,
              ...rest.inputProps,
            }}
            style={inputStyle}
            {...rest}
          />
        </div>)
      }
    </>
  );
};
GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'file', 'checkbox']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string,
  icon: PropTypes.elementType,
  validation: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  accept: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
};

export default GenericInput;
