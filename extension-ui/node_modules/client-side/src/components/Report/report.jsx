import React,{useState} from 'react';
// import PdfGenerator from './pdf.jsx';
import Select from '../../stories/Select/Select.jsx';
import { OPTION_ARRAY, TIME } from './report.constant.jsx';

export default function Report() {
  const [selectType, setSelectType] = useState(TIME.Month);
  const selectFunction=(selectedValue)=>{
    switch (selectedValue){
      case 1:
        setSelectType(TIME.DAY.text);
        break;
      case 2:
        setSelectType(TIME.Month.text);
        break;
      case 3:
        setSelectType(TIME.YEAR.text);
        break;
      case 4:
        setSelectType(TIME.CUSTUM.text);
        dateTimePiker();
        break;
      default:
        break;
    }
    fillData();
  };
  const dateTimePiker=()=>{

  };



  
  const fillData=()=>{

  };
  return (
    <div>
        <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" options={OPTION_ARRAY}  title="time arrange" size='medium' widthOfSelect="150px"/>
        {/* <PdfGenerator data={[]} />   כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}
    </div>
  );
}

