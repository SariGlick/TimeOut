import React from "react";
import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import './DateInputs.scss';
const DateInputs = ({ onChange }) => {
    return (
        <div className='timeInputWrapper'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
};
DateInputs.propTypes = {
    onChange: PropTypes.func.isRequired,
};
export default DateInputs;