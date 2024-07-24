import React, { useState } from 'react';
import GenericButton from '../stories/Button/GenericButton';
import DateInputs from "../stories/DateTime/DateInputs";

const DateTimePicker = ({onDateSubmit}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (start) => {
        setStartDate(start);
    };
    const handleEndDateChange = (end) => {
        setEndDate(end);
    };
    const handleSubmit = () => {
        onDateSubmit(startDate, endDate);
    };

    const isButtonDisabled = (!startDate || !endDate) || startDate > endDate; // Button is disabled when startDate or endDate is empty


    return (
        <div>
            <DateInputs onChange={handleStartDateChange} className="start" />
            <br></br>
            <DateInputs onChange={handleEndDateChange} className="end" />
            <GenericButton className='submit' label='submit' onClick={handleSubmit} disabled={isButtonDisabled} />
        </div>
    );
};
export default DateTimePicker;







