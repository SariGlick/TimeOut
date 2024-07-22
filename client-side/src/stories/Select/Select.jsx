import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMui from '@mui/material/Select';
import PropTypes, { shape } from 'prop-types';
import './select.scss';

const Select = ({className, options= [{ text: "option1", icon: '🖋️' }, { text: "option2", icon: '🖋️' }], onChange = undefined, title,size= 'large',widthOfSelect, value}) => {
  return ( 
     <div className='selectWrapper' >
      <Box>
       <FormControl  size={size} variant="outlined">
        <InputLabel  className='input' >{title}</InputLabel>
        <SelectMui  style={{width:widthOfSelect}} label={title}
          className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
          onChange={onChange}
          value={value}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value} >
              {option.text}
              {option.icon}
            </MenuItem>
          ))}
        </SelectMui>
      </FormControl>
    </Box></div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string.isRequired
};


export default Select;