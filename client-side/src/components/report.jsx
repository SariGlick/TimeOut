import React, { useState } from 'react';
import GenericButton from '../stories/Button/GenericButton';
import DateInput from "../stories/DateTime/DateInput";
import './report.scss'

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const storeArr = () => {
        const dataArr = [startDate, endDate];
        //fillData(dataArr);
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

export default DateTimePicker;