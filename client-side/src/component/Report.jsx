import { useEffect, useState } from "react";
import axios from 'axios';
import GenericButton from '../stories/Button/GenericButton';
import DateInputs from "../stories/DateTime/DateInputs";
import TableComponent from "./table/TableComponent";

export default function Report() {

    const [data, setData] = useState({})
    const [selectType, setSelectType] = useState("month")
    const [customArr, setCustomArr] = useState(null)
   
    useEffect(() => {
        fillData()
    }, [])


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
        fillData()
      };


      const dateTimePiker=()=>{
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const storeArr = () => {
                const dataArr = [startDate, endDate];
                 fillData(dataArr);
      };

      const handleStartDateChange = (start) => {
        console.log('Start Date Selected:', start);
        setStartDate(start);
    };
    const handleEndDateChange = (end) => {
        console.log('End Date Selected:', end);
        setEndDate(end);
    };
    const isButtonDisabled = (!startDate || !endDate) ||startDate > endDate; // Button is disabled when startDate or endDate is empty
    console.log('Is Button Disabled:', isButtonDisabled);
}


    const fillData = async () => {

        const body = {
            userId: 1,
            type: selectType,
            customDates:customArr
        }

        try {
            await axios.post(`http://localhost:4000/product`, body)
                .then(res => {
                    debugger;
                    setData(res.data)
                })
        }
        catch {
            console.log("faild")
        }
    }

    let args = {
        dataObject: {
            headers: ['id', 'name', 'profession', 'age', 'city'],
            rows: [
                { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
                { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
                { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },
                { id: 1, name: 'יונתן', profession: 'אנגלית', age: 25, city: 'תל אביב' },

            ],
        },
        widthOfTable: "55%",
        widthOfColums: [80, 150, 200, 150, 150]

    }
    return (
        <>
           <Select onChange={(selectedValue) => selectFunction(selectedValue) } className="primary" 
           options={[{value:1,text:"day",iconSrc:'/images/time-twenty-four.svg'},
           {value:2,text:"month",iconSrc:'images/calendar-date-svgrepo-com.svg'},
           {value:3,text:"year",iconSrc:'/images/calendar-month-schedule-time-date-svgrepo-com.svg'},
           {value:4,text:"custum",iconSrc:'/images/calendar-date-svgrepo-com (1).svg'}]} 
            title="time arrange" size='medium' widthOfSelect="150px"/>
                <DateInputs onChange={handleStartDateChange} className="start" />
            <DateInputs onChange={handleEndDateChange} className="end" />
            <GenericButton className='submit' label='submit' onClick={storeArr} disabled={isButtonDisabled} />
             {/* <PdfGenerator data={[]} />   כאן נשלח את הנתונים של הטבלה כדי שיודפסו בקובץ פדפ */}

            <TableComponent {...args} />
        </>
    )
}
