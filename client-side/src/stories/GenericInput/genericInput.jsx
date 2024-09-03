import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Button, Checkbox, FormControlLabel } from '@mui/material';
import { INVALID_INPUT_MESSAGE } from './constants';
import './genericInput.scss';



import '../GenericInput/genericInput.scss';

const GenericInput = ({
  label, 
  type = 'text',
  name = '', 
  value = '',
  onChange = () => { },
  size = 'medium',
  width = '20%',
  icon: Icon = null,
  disabled = false,
  accept,
  min,
  max,
  validation = () => { },
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
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value;
    setInputValue(newValue);

    onChange(e);
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

{/* =======
  
  
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

>>>>>>> b611101e51b7905f88cac8bced680b70104bece2 */}
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
              min: min,
              max: max
            }}
            style={inputStyle}
            {...rest}
          />
        </div>)
      }
    </>

  )
    



  return (
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
    </div>
  );
};

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string,
  icon: PropTypes.elementType,
  validation: PropTypes.func,
  accept: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled:PropTypes.string,

};

export default GenericInput;
