import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateInput from "../DateTime/DateInput";
import GenericButton from "../Button/GenericButton";
import "./DatePicker.scss";

const DatePicker = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const storeArr = () => {
    const dataArr = [startDate, endDate];
    onSubmit(dataArr)
  }

  const isButtonDisabled = (!startDate || !endDate) || startDate > endDate;

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
      <GenericButton className='submit' label='submit' onClick={storeArr} disabled={isButtonDisabled} />
    </div>
  );
};

DatePicker.propTypes = {
  onSubmit: PropTypes.func, // Allowing users to pass their custom onSubmit function
};

export default DatePicker;