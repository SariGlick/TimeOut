
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Select from '../Select/Select';
import GenericButton from '../Button/GenericButton.jsx'
import axios from 'axios';
import {formatDate} from './formatDate.js'

const DateFormatter = ({ initialDate }) => {
  const [currentDate, setCurrentDate] = useState(format(initialDate, 'yyyy-MM-dd'));
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
const url=process.env.REACT_APP_BASE_URL;
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

  
 const sendFormatDate = async()=>{
   const response = await axios.put(`${url}/preferences/`)
 }

  return (
    <div className="dateWrapper">
     <Select
        className='select-data-frequency'
        options={dateFormats.map(formatOption => ({
          text: formatOption.label,
          value: formatOption.value,
        }))}
        onChange={e=>formatDate(e.target.value,Date())}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />
        <GenericButton size='medium' label='send format date' onClick={sendFormatDate}/>
    </div>
  );
  
};

export default DateFormatter;
