import React, { useState } from 'react';
import GenericButton from '../stories/Button/GenericButton';
import DateInput from "../stories/DateTime/DateInput";
import './report.scss'

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const storeArr = () => {
        console.log(startDate.$d.toISOString(), " s ", endDate.$d.toISOString());
        setCustomArr([startDate.$d.toISOString(), endDate.$d.toISOString()]);
        console.log(customArr, "setCustomArr");
          }
      const submit = (!startDate || !endDate) || startDate > endDate;
      if (!submit)
      {
        fillData()
      }

      const handleDateChange = (inputName, date) => {
        if (inputName === 'start') {
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      }

    return (
        <div>
            <DateInput onChange={date => handleDateChange('start', date)} className="start" />
            <DateInput onChange={date => handleDateChange('end', date)} className="end" />
        </div>
    );
};

export default DateTimePicker;