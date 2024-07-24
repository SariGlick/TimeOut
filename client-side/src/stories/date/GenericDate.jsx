
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getIconUtilityClass } from '@mui/material';
import Select from '../Select/Select';


const DateFormatter = ({ initialDate }) => {
  const [currentDate, setCurrentDate] = useState(format(initialDate, 'yyyy-MM-dd'));
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');

  const dateFormats = [
    { value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
    { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    { value: 'do MMMM yyyy', label: 'do MMMM yyyy' },
    { value: 'EEEE, MMMM do, yyyy', label: 'EEEE, MMMM do, yyyy' },
    { value: 'yyyy-MM-dd HH:mm:ss', label: 'yyyy-MM-dd HH:mm:ss' },
  ];

  useEffect(() => {
    setCurrentDate(format(initialDate, dateFormat));
  }, [initialDate, dateFormat]);

  const handleDateFormatChange = (event) => {
    console.log('at handleDateFormatChange');
    const newFormat = event.target.value;
    console.log('newFormat',newFormat);
    setDateFormat(newFormat);
    const formatDate=format(initialDate, newFormat);
    console.log(formatDate);
    setCurrentDate(formatDate);
  };
 
  return (
    <div className="dateWrapper">
     <Select
        className='select-data-frequency'
        options={dateFormats.map(formatOption => ({
          text: formatOption.label,
          value: formatOption.value,
        }))}
        onChange={handleDateFormatChange}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />
      <p className="formattedDate">Formatted Date:  {currentDate}</p>
    </div>
  );
  
};

export default DateFormatter;
