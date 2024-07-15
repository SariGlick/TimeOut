import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMui from '@mui/material/Select';
import PropTypes, { shape } from 'prop-types';
import './select.scss';

const Select = ({className, options, onChange, title,size,widthOfSelect}) => {
  return ( 
     <div className='selectWrapper' >
      <Box>
       <FormControl  size={size} variant="outlined">
        <InputLabel  className='input' >{title}</InputLabel>
        <SelectMui  style={{width:widthOfSelect}} label={title}
          className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option} >
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
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string.isRequired
};

Select.defaultProps = {
  size: 'large',
  onChange: undefined,
  options:[{text:"option1",icon:'🖋️'},{text:"option2",icon:'🖋️'}]
};

export default Select;
