import React from 'react';
import {Box,InputLabel,MenuItem,FormControl}from '@mui/material';
import SelectMui from '@mui/material/Select';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import './select.scss';

const Select = ({ className, options = [{ text: "option1", icon: '🖋️' }, { text: "option2", icon: '🖋️' }], onChange = undefined, title, size = 'large', widthOfSelect, value, name }) => {
  return (
=======
import { OPTION_SELSCT } from './select.constat';
import './select.scss';

const Select = ({
  className,
  options = OPTION_SELSCT,
  onChange = () => {},
  title,
  size = 'large',
  widthOfSelect
}) => {
  return ( 
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
    <div className='selectWrapper'>
      <Box>
        <FormControl size={size} variant="outlined">
          <InputLabel className='input'>{title}</InputLabel>
<<<<<<< HEAD
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
=======
          <SelectMui style={{width: widthOfSelect}} label={title}
            className={` genericSelect ${className} `}
            onChange={(event) => onChange(event.target.value)}
          >
            {options.map((option, index) => (
              <MenuItem key={index}  value={option.value}>
                {<img className="img" src={option.iconSrc}  />}
                {option.text}
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
              </MenuItem>
            ))}
          </SelectMui>
        </FormControl>
      </Box>
    </div>
<<<<<<< HEAD
=======
    
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
<<<<<<< HEAD
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
=======
    value: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    iconSrc: PropTypes.string
  })).isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string.isRequired,
  widthOfSelect: PropTypes.string
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
};

export default Select;
