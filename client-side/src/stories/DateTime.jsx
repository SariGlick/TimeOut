import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import './DateTime.scss';




export default function DateTime() {
  return (
    <div className='dateTime'>
      <LocalizationProvider dateAdapter={AdapterDayjs} className='localizationProvider'>
        <DemoContainer className="timeInput" components={['DateTimeRangePicker']}>
          <DateTimeRangePicker localeText={{ start: 'start', end: 'end' }} className='DateTimeRangePicker'/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}