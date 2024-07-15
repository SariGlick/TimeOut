import React from "react";
import PropTypes from 'prop-types';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimeRangePicker} from '@mui/x-date-pickers-pro'
import {LocalizationProvider} from '@mui/x-date-pickers'
import './DateInputs.scss';

const DateInputs = ({onAccept})=>{
    return(
        <div className='timeInputWrapper'>
      <LocalizationProvider dateAdapter={AdapterDayjs} className='localizationProvider'>
        <DemoContainer  className="timeInput" components={['DateTimeRangePicker']}>
          <DateTimeRangePicker onAccept={onAccept}  localeText={{ start: 'start', end: 'end' }} className='DateTimeRangePicker'/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
    );
};

DateInputs.propTypes = {
        onAccept: PropTypes.func.isRequired,
};

export default DateInputs;