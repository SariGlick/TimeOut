import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { selectAuth } from '../../redux/auth/auth.selector';
import DateInput from "../DateTime/DateInput";
import GenericButton from "../Button/GenericButton";
import "./DatePicker.scss";

const DatePicker = ({ onSubmit }) => {
  const { user } = useSelector(selectAuth);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { timeZone = 'UTC', dateFormat = 'DD-MM-YYYY' } = user.preference;

  const storeArr = () => {
    const formattedStartDate = moment(startDate).tz(timeZone).format(dateFormat);
    const formattedEndDate = moment(endDate).tz(timeZone).format(dateFormat);

    const dataArr = [formattedStartDate, formattedEndDate];
    onSubmit(dataArr);
  };

  const isButtonDisabled = (!startDate || !endDate) || startDate > endDate;

  const handleDateChange = (inputName, date) => {
    if (inputName === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="date-picker-container">
      <DateInput onChange={date => handleDateChange('start', date)} format={dateFormat} className="start" />
      <DateInput onChange={date => handleDateChange('end', date)} format={dateFormat} className="end" />
      <GenericButton className='submit' label='submit' onClick={storeArr} disabled={isButtonDisabled} />
    </div>
  );
};

DatePicker.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DatePicker;