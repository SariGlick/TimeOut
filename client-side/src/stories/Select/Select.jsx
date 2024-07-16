import React from 'react';
import {Box,InputLabel,MenuItem,FormControl}from '@mui/material';
import SelectMui from '@mui/material/Select';
import PropTypes from 'prop-types';
import './select.scss';

const Select = ({
  className,
  options = [
    { value: 1, text: "Option 1", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
    { value: 2, text: "Option 2", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' }
  ],
  onChange = () => {},
  title,
  size = 'large',
  widthOfSelect
}) => {
  return ( 
    <div className='selectWrapper'>
      <Box>
        <FormControl size={size} variant="outlined">
          <InputLabel className='input'>{title}</InputLabel>
          <SelectMui style={{width: widthOfSelect}} label={title}
            className={` genericSelect ${className} `}
            onChange={(event) => onChange(event.target.value)}
          >
            {options.map((option, index) => (
              <MenuItem key={index}  value={option.value}>
                {<img className="img" src={option.iconSrc}  />}
                {option.text}
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
    value: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    iconSrc: PropTypes.string
  })).isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string.isRequired,
  widthOfSelect: PropTypes.string
};

export default Select;
