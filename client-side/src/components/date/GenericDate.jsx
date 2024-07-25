import React, { useState } from 'react';
import {formatDate} from './formatDate.js'
import axios from 'axios';
import Select from '../../stories/Select/Select.jsx'
import GenericButton from '../../stories/Button/GenericButton.jsx'



const DateFormatter = ({ currentUser }) => {
  
  const {emailFrequency,sendNotificationTime,soundVoice,_id}=currentUser.preferences
  const {formatedDate}=currentUser;
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
const url=process.env.REACT_APP_BASE_URL;
  const dateFormats = [
    { value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
    { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    { value: 'do MMMM yyyy', label: 'do MMMM yyyy' },
    { value: 'EEEE, MMMM do, yyyy', label: 'EEEE, MMMM do, yyyy' },
    { value: 'yyyy-MM-dd HH:mm:ss', label: 'yyyy-MM-dd HH:mm:ss' },
  ];
  
 const sendFormatDate = async()=>{
   const response = await axios.put(`${url}/preferences/`)
 }

  return (
    <div className="dateWrapper">
     <Select
        className='select-data-frequency'
        options={dateFormats.map(formatOption => ({
          text: formatOption.label,
          value: formatOption.value,
        }))}
        onChange={e=>formatDate(e.target.value,Date())}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />
        <GenericButton size='medium' label='send format date' onClick={sendFormatDate}/>
    </div>
    
  );
  
};
DateFormatter.propTypes = {
  currentUser: PropTypes.shape({
    preferences: PropTypes.shape({
      emailFrequency: PropTypes.string,
      sendNotificationTime: PropTypes.string,
      soundVoice: PropTypes.string,
      _id: PropTypes.string,
    }).isRequired,
    formatedDate: PropTypes.string,
  }).isRequired,
};

DateFormatter.defaultProps = {
  currentUser: {
    preferences: {
      emailFrequency: '',
      sendNotificationTime: '',
      soundVoice: '',
      _id: '',
    },
    formatedDate: 'yyyy-MM-dd',
  },
};

export default DateFormatter;
