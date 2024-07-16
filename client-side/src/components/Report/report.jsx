import React from 'react';
import PdfGenerator from './pdf.jsx';
import { useState } from 'react';
import Select from '../../stories/Select/Select.jsx';

export default function Report() {
  const [selectType, setSelectType] = useState("month");
  const selectFunction=(selectedValue)=>{
    if(selectedValue==1){
      setSelectType("day");
    }
    else   if(selectedValue==2){
      setSelectType("month");
    }
    else   if(selectedValue==3){
      setSelectType("year");
    }
    else   if(selectedValue==4){
      setSelectType("custum");
      dateTimePiker();
    }
  };
  const dateTimePiker=()=>{

  };
  return (
    <div>
        <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" options={[{value:1,text:"day",iconSrc:'/images/time-twenty-four.svg'},{value:2,text:"month",iconSrc:'images/calendar-date-svgrepo-com.svg'},{value:3,text:"year",iconSrc:'/images/calendar-month-schedule-time-date-svgrepo-com.svg'},{value:4,text:"custum",iconSrc:'/images/calendar-date-svgrepo-com (1).svg'}]}  title="time arrange" size='medium' widthOfSelect="150px"/>
        <PdfGenerator data={[]} />   {/* כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}
    </div>
  );
}
