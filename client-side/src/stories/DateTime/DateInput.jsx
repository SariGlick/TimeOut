import React from "react";
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers';
import './DateInput.scss';

const DateInput = ({onAccept})=>{
    return(
        <div className='timeInputWrapper'>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
    </LocalizationProvider>

    </div>
    );
};

DateInputs.propTypes = {
        onAccept: PropTypes.func.isRequired,
};

export default DateInput;