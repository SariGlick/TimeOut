
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box,Tabs,Tab} from '@mui/material';
import './tabs.scss'


export default function LabTabs({ nameOfClass = "every-tabs", text = [], nav=[]}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleTabClick = (index) => {
    if (nav && nav[index]) {
      navigate(nav[index]);
    }
  };

  return (
    <div className='div'>
    <Box sx={{ width: '100%'}} >
      <Tabs value={value} onChange={handleChange} centered
              TabIndicatorProps={{
                className: 'tabs', 
              }}>
        {Array.isArray(text) && text.map((label, index) => (
          <Tab className={nameOfClass} key={index} label={label} onClick={() => handleTabClick(index)}/>
        ))}
      </Tabs>
    </Box>
    </div>
  );
}

LabTabs.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameOfClass: PropTypes.string,
  nav:PropTypes.arrayOf(PropTypes.string).isRequired
};

LabTabs.defaultProps = {
  nameOfClass: "every-tabs"
};