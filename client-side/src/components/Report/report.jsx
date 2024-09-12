import { useEffect, useState } from "react";
import Select from '../../stories/Select/Select.jsx';
import TableComponent from '../../stories/table/TableComponent';
import Loader from "../../stories/loader/loader";
import GenericButton from '../../stories/Button/GenericButton';
import DateInput from "../../stories/DateTime/DateInput";
import PdfGenerator from "./pdf.jsx";
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { OPTION_ARRAY, TIME } from './report.constant.jsx';
import {handlePost} from '../../axios/middleware.js'
import './report.scss'
import { useSelector } from "react-redux";

export default function Report() {

  const [data, setData] = useState([])
  const [customArr, setCustomArr] = useState([])
  const [selectType, setSelectType] = useState(TIME.Month.text);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateTimePiker, setDateTimePiker] = useState(false);
  const user = useSelector(state => state.user.currentUser|| {});

  const selectFunction = (selectedValue) => {
    switch (selectedValue) {
      case 1:
        setSelectType(TIME.DAY.text);
        setDateTimePiker(false);
        break;
      case 2:
        setSelectType(TIME.Month.text);
        setDateTimePiker(false);
        break;
      case 3:
        setSelectType(TIME.YEAR.text);
        setDateTimePiker(false);
        break;
      case 4:
        setSelectType(TIME.CUSTOM.text);
        setDateTimePiker(true);
        break;
      default:
        break;
    }
    if (selectedValue != 4) {
      fillData();
    }
  };

  useEffect(() => {
    fillData();
  }, [data])


  const storeArr = () => {
    setCustomArr([startDate.$d.toISOString(), endDate.$d.toISOString()]);
    fillData();
  }

  const isButtonDisabled = (!startDate || !endDate) || startDate > endDate;

  const handleDateChange = (inputName, date) => {
    if (inputName === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  }



  const fillData = async () => {
    const body = {
      userId: user.id,
      type: selectType,
      customDates: selectType === "custom" ? customArr : null
    }

    try {
      await handlePost(`/vistedWebsite/showVisitedWebsite`, body)
        .then(res => {
          setData(res.data)
          
        })
    }
    catch {
      console.log("faild")
    }
    
  }

  let args = {
    dataObject: {
      headers: ['id', 'website_name', 'total_time', 'avg_for_day'],
      rows: data
    },
    widthOfTable: "55%",
    widthOfColums: [80, 230, 200, 200]

  }
  return (
    <>
      <h1 className="title">select the time arrange for your report</h1>
      <div id="reportPage">
        <Select onChange={(selectedValue) => selectFunction(selectedValue)} className="primary" options={OPTION_ARRAY} title="time arrange" size='medium' widthOfSelect="150px" />
        {dateTimePiker &&
          <div className="container">
            <div className="date-inputs">
              <DateInput onChange={date => handleDateChange('start', date)} className="start" />
              <DateInput onChange={date => handleDateChange('end', date)} className="end" />
            </div>
            <div>
              <GenericButton className='submit' label='submit' onClick={storeArr} disabled={isButtonDisabled} />
            </div>
          </div>}
      </div>
      <div className="table-wrapper">
        {data[0] && data[0] != -1 && <TableComponent {...args} />}
      </div>

      <div className="loader">
        {!data.length && <Loader className="secondary" />}
      </div>
      <div className="pdf-wrap">
        {data[0] && data[0] != -1 && <PdfGenerator data={data} />}
      </div>
      
      {data[0]==-1 && <ToastMessage open={true} type={'info'} message={"No websites were browsed in the given date range"}/>}

    </>
  )
}
