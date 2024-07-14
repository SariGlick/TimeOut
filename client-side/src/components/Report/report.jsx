import React from 'react';
import PdfGenerator from './pdf.jsx';
import Select from '../../stories/Select/Select.jsx';
import { useState } from 'react';

export default function Report() {
  const [day,setDay]=useState(false);
  const [mounth,setMounth]=useState(false);
  const [year,setYear]=useState(false);
  const [custum,setCustum]=useState(false);
  const selectFunctions=(ev)=>{
    console.log("jujuhu");
    if(ev.target.value=="day"){
      setDay(true);
    }
    else   if(ev.target.value=="month"){
      setMounth(true);
    }
    else   if(ev.target.value=="year"){
      setYear(true);
    }
    else   if(ev.target.value=="custum"){
      setCustum(true);
    }

  };
  return (
    <div>
      {/* לשים היכונים- לשאול את חני איך היא התכוונה לשים אותם - כי הם לא בתוך תגית של תמונה. */}
      {/* הפונקציה של הסלקט איך היא מקבלת מי עבר עליה לא אמור ליהיות event.target? */}
        <Select className="primary" options={[{text:"day",icon:''},{text:"month",icon:''},{text:"year",icon:''},{text:"custum",icon:''}]} onChange={selectFunctions} title="primary select" size='medium' widthOfSelect="150px"/>
        {/* {custum&&}
        {year&&}
        {day&&}
        {mounth&&} */}
        <PdfGenerator data={[{SiteName:'gmail',BrowsingTime:20,AvgForADay:1}]} />
    </div>
  );
}
