import React,{useState} from 'react';
// import PdfGenerator from './pdf.jsx';
import Select from '../../stories/Select/Select.jsx';
import { Time, optionArray } from './report.constant.jsx';

export default function Report() {
  const [selectType, setSelectType] = useState(Time.Month);
  const selectFunction=(selectedValue)=>{
    if(selectedValue==1){
      setSelectType(Time.DAY.text);
    }
    else   if(selectedValue==2){
      setSelectType(Time.Month.text);
    }
    else   if(selectedValue==3){
      setSelectType(Time.YEAR.text);
    }
    else   if(selectedValue==4){
      setSelectType(Time.CUSTUM.text);
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
        <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" options={optionArray}  title="time arrange" size='medium' widthOfSelect="150px"/>
        {/* <PdfGenerator data={[]} />   כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}
    </div>
  );
}

