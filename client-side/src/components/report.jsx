import React, { useState } from 'react';
import {GenericButton,DateInputs} from '../stories/index';

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const storeArr = () => {
            const dataArr = [startDate, endDate];
             //fillData(dataArr);
       
    }
       

    const handleStartDateChange = (start) => {
        console.log('Start Date Selected:', start);
        setStartDate(start);
    };
    const handleEndDateChange = (end) => {
        console.log('End Date Selected:', end);
        setEndDate(end);
    };
    const isButtonDisabled = (!startDate || !endDate) ||startDate > endDate; // Button is disabled when startDate or endDate is empty
    console.log('Is Button Disabled:', isButtonDisabled);

    
    return (
        <div>
            <DateInputs onChange={handleStartDateChange} className="start" />
            <br></br>
            <DateInputs onChange={handleEndDateChange} className="end" />
            <GenericButton className='submit' label='submit' onClick={storeArr} disabled={isButtonDisabled} />
        </div>
    );
};
export default DateTimePicker;