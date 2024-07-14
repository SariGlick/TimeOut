import React from 'react';
import PdfGenerator from './pdf.jsx';
import { useState } from 'react';
import Select from '../../stories/Select/Select.jsx';

export default function Report() {
  const [day,setDay]=useState(false);
  const [mounth,setMounth]=useState(false);
  const [year,setYear]=useState(false);
  const [custum,setCustum]=useState(false);
  const selectFunctions=(selectedValue)=>{
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
      {/* לשים היכונים- לשאול את חני איך היא התכוונה לשים אותם - כי הם לא בתוך תגית של תמונה. */}
      {/* הפונקציה של הסלקט איך היא מקבלת מי עבר עליה לא אמור ליהיות event.target? */}
        <Select onChange={(selectedValue) => selectFunctions(selectedValue) } className="primary" options={[{value:1,text:"day",iconSrc:'/images/day.png'},{value:2,text:"month",iconSrc:'images/month.png'},{value:3,text:"year",iconSrc:'/images/year.png'},{value:4,text:"custum",iconSrc:'/images/custum.png'}]}  title="time arrange" size='medium' widthOfSelect="150px"/>
        {/* {custum&&}
        {year&&}  
        {day&&}
        {mounth&&} */}
        <PdfGenerator data={[{SiteName:'gmail',BrowsingTime:20,AvgForADay:1}]} />
    </div>
  );
}
