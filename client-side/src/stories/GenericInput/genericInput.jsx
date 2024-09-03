import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment ,Button} from '@mui/material';

import { INVALID_INPUT_MESSAGE } from './constants';
<<<<<<< HEAD
import { TextField, InputAdornment } from '@mui/material';
import './genericInput.scss';
const GenericInput = ({
  label,
  name,
  type = 'text',
  value = '',
  onChange = () => {},
  size = 'medium',
  width = '20%',
  icon: Icon = null,
  disabled = false,
  validation = () => {},
  ...rest
=======
import '../GenericInput/genericInput.scss';

const GenericInput = ({ 
  label, 
  type = 'text',
  name = '', 
  value = '', 
  onChange = () => {}, 
  size = 'medium', 
  width = '20%', 
  icon: Icon=null, 
  disabled= false,
  accept,
  validation  = () => {}, 
  ...rest 
>>>>>>> main
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
    if (onChange) {
      onChange({ target: { name, value: newValue } });
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
<<<<<<< HEAD
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
  name: PropTypes.string.isRequired,
=======
   
  const inputStyle = {
    width,
  };
  
  
  return(
    <>
      {type==='file' ?(<div className="file-upload" style={inputStyle}>
        <Button
          component="label"
          size={size}
          disabled={disabled}
          className='generic-input-file'
        >
          {label}

          <input type='file' onChange={onChange}  id='hidenInput' disabled={disabled} accept={accept}/>
        </Button>
        {error && <div className="helper-text error">{helperText}</div>}
      </div>) :(
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
>>>>>>> main

  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string,
  icon: PropTypes.elementType,
  validation: PropTypes.func,
  disabled:PropTypes.string,
  accept:PropTypes.string
};
export default GenericInput;