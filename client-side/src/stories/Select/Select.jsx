import React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import SelectMui from '@mui/material/Select';
import PropTypes from 'prop-types';

import { OPTION_SELSCT } from './select.constat';
import './select.scss';

const Select = ({
  className,
  options = OPTION_SELSCT,
  onChange = () => { },
  title,
  size = 'large',
  widthOfSelect,
  value,
  'data-testid': dataTestId
}) => {
  return (
    <div className='selectWrapper'>
      <Box>
        <FormControl size={size} variant="outlined">
          <InputLabel className='input'>{title}</InputLabel>
          <SelectMui
            style={{ width: widthOfSelect }}
            label={title}
            className={` genericSelect ${className} `}
            onChange={(event) => onChange(event.target.value)}
            value={value}
            inputProps={{ 'data-testid': dataTestId }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null, 
              disablePortal: true, 
              PaperProps: {
                style: {
                  maxHeight: 350, 
                  overflowY: 'auto', 
                },
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.iconSrc && <img className="img" src={option.iconSrc} alt="" />}
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
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string.isRequired,
  widthOfSelect: PropTypes.string,
  value: PropTypes.any.isRequired,
  'data-testid': PropTypes.string
};
export default Select;

