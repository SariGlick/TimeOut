import React from 'react';
import PdfGenerator from './pdf.jsx';
import { useState } from 'react';
import Select from '../../stories/Select/Select.jsx';

export default function Report() {
  const [day,setDay]=useState(false);
  const [mounth,setMounth]=useState(true);
  const [year,setYear]=useState(false);
  const [custum,setCustum]=useState(false);
  const selectFunction=(selectedValue)=>{
    setDay(false);
    setMounth(false);
    setYear(false);
    setCustum(false);
    if(selectedValue==1){
      setDay(true);
    }
    else   if(selectedValue==2){
      setMounth(true);
    }
    else   if(selectedValue==3){
      setYear(true);
    }
    else   if(selectedValue==4){
      setCustum(true);
    }
  };
  return (
    <div>
        <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" options={[{value:1,text:"day",iconSrc:'/images/time-twenty-four.svg'},{value:2,text:"month",iconSrc:'images/calendar-date-svgrepo-com.svg'},{value:3,text:"year",iconSrc:'/images/calendar-month-schedule-time-date-svgrepo-com.svg'},{value:4,text:"custum",iconSrc:'/images/calendar-date-svgrepo-com (1).svg'}]}  title="time arrange" size='medium' widthOfSelect="150px"/>
        <PdfGenerator data={[]} />   {/* כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}
    </div>
  );
}
