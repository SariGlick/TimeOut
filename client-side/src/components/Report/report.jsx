import React from 'react';
import PdfGenerator from './pdf.jsx';
import { useState } from 'react';
import Select from '../../stories/Select/Select.jsx';
import File from './file.jsx';

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
        <File/>
        <Select onChange={(selectedValue) => selectFunctions(selectedValue) } className="primary" options={[{value:1,text:"day",iconSrc:'/images/day.png'},{value:2,text:"month",iconSrc:'images/month.png'},{value:3,text:"year",iconSrc:'/images/year.png'},{value:4,text:"custum",iconSrc:'/images/custum.png'}]}  title="time arrange" size='medium' widthOfSelect="150px"/>
        <PdfGenerator data={[{SiteName:'gmail',BrowsingTime:20,AvgForADay:1}]} />
    </div>
  );
}
