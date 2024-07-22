import React,{useState} from 'react';
import PdfGenerator from './pdf.jsx';
import Select from '../../stories/Select/Select.jsx';
import { Time } from './report.constant.jsx';

export default function Report() {
  const [selectType, setSelectType] = useState(Time.Month);
  const selectFunction=(selectedValue)=>{
    if(selectedValue==1){
      setSelectType(Time.DAY.name);
    }
    else   if(selectedValue==2){
      setSelectType(Time.Month.name);
    }
    else   if(selectedValue==3){
      setSelectType(Time.YEAR.name);
    }
    else   if(selectedValue==4){
      setSelectType(Time.CUSTUM.name);
      dateTimePiker();
    }
    fillData();
  };
  const dateTimePiker=()=>{

  };
  const fillData=()=>{

  };
  return (
    <div>
        <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" options={[{value:1,text:Time.DAY.name,iconSrc:Time.DAY.icon},{value:2,text:Time.Month.name,iconSrc:Time.Month.icon},{value:3,text:Time.YEAR.name,iconSrc:Time.YEAR.icon},{value:4,text:Time.CUSTUM.name,iconSrc:Time.CUSTUM.icon}]}  title="time arrange" size='medium' widthOfSelect="150px"/>
        <PdfGenerator data={[]} />   {/* כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}
    </div>
  );
}

