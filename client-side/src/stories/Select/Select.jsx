import React from 'react';
import {Box,InputLabel,MenuItem,FormControl}from '@mui/material';
import SelectMui from '@mui/material/Select';
import PropTypes from 'prop-types';
import './select.scss';

const Select = ({ className, options, onChange = undefined, title, size = 'large', widthOfSelect, value, name }) => {
  return (
    <div className='selectWrapper'>
      <Box>
        <FormControl size={size} variant="outlined">
          <InputLabel className='input'>{title}</InputLabel>
          <SelectMui
            style={{ width: widthOfSelect }}
            label={title}
            className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
            onChange={onChange}
            value={value}
            name={name}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.text}
                {option.icon}
              </MenuItem>
            ))}
          </SelectMui>
        </FormControl>
      </Box>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.node
  })).isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
  name: PropTypes.string
};

export default Select;
