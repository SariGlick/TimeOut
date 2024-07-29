
import React, { useState } from 'react';
import axios from 'axios';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import PropTypes from 'prop-types';
import formatDate from './formatDate.js';

const DateFormatter = ({ currentUser, date }) => {
  const { emailFrequency, sendNotificationTime, soundVoice, _id } = currentUser.preferences;
  const { formatedDate } = currentUser;
  const [dateFormat, setDateFormat] = useState(formatedDate || 'yyyy-MM-dd');

  const url = process.env.REACT_APP_BASE_URL;

  const dateFormats = [
    { value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
    { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    { value: 'do MMMM yyyy', label: 'do MMMM yyyy' },
    { value: 'EEEE, MMMM do, yyyy', label: 'EEEE, MMMM do, yyyy' },
    { value: 'yyyy-MM-dd HH:mm:ss', label: 'yyyy-MM-dd HH:mm:ss' },
  ];

  const sendFormatDate = async () => {
    try {
      const response = await axios.put(`${url}/users/669f86c302f253ec5a6f5162`);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending format date:', error);
    }
  };

  return (
    <div className="dateWrapper">
      <Select
        className='select-data-frequency'
        options={dateFormats.map(formatOption => ({
         text: formatOption.label,
         value: formatOption.value,
          }))}
        value={dateFormat}
        onChange={e => setDateFormat(e.target.value)}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />
      <GenericButton size='medium' label='send format date' onClick={sendFormatDate} />
      <div>{formatDate(dateFormat, date)}</div>
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
  date: PropTypes.instanceOf(Date),
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
  date: new Date(),
};

export default DateFormatter;





// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from '../../stories/Select/Select.jsx'
// import GenericButton from '../../stories/Button/GenericButton.jsx'
// import PropTypes from 'prop-types';
// import formatDate from './formatDate.js'




// const DateFormatter = ({ currentUser, date }) => {
//   console.log(date);
//   const {emailFrequency,sendNotificationTime,soundVoice,_id}=currentUser.preferences;
//   const {formatedDate}=currentUser;
//   const [dateFormat, setDateFormat] = useState(currentUser.formatedDate || 'yyyy-MM-dd');

// const url=process.env.REACT_APP_BASE_URL;

//   const dateFormats = [
//     { value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
//     { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
//     { value: 'do MMMM yyyy', label: 'do MMMM yyyy' },
//     { value: 'EEEE, MMMM do, yyyy', label: 'EEEE, MMMM do, yyyy' },
//     { value: 'yyyy-MM-dd HH:mm:ss', label: 'yyyy-MM-dd HH:mm:ss' },
//   ];
  
//  const sendFormatDate = async()=>{
//   console.log(url)
//    const response = await axios.put(`${url}/user/669f86c302f253ec5a6f5162`)
//  }

//   return (
//     <div className="dateWrapper">
//       <Select
//         className='select-data-frequency'
//         options={dateFormats.map(formatOption => ({
//           text: formatOption.label,
//           value: formatOption.value,
//         }))}
//         value={dateFormat}
//         onChange={e => formatDate(e.target.value,date)}
//         title='Select date format'
//         size='large'
//         widthOfSelect='210px'
//       />
//         <GenericButton size='medium' label='send format date' onClick={sendFormatDate}/>

//         <div>{formatDate(dateFormat, date)}</div>
//     </div>
    
//   );
  
// };

// DateFormatter.propTypes = {
//   currentUser: PropTypes.shape({
//     preferences: PropTypes.shape({
//       emailFrequency: PropTypes.string,
//       sendNotificationTime: PropTypes.string,
//       soundVoice: PropTypes.string,
//       _id: PropTypes.string,
//     }).isRequired,
//     formatedDate: PropTypes.string,
//   }).isRequired,
//   date: PropTypes.instanceOf(Date),
// };

// DateFormatter.defaultProps = {
//   currentUser: {
//     preferences: {
//       emailFrequency: '',
//       sendNotificationTime: '',
//       soundVoice: '',
//       _id: '',
//     },
//     formatedDate: 'yyyy-MM-dd',
//   },
// };

// export default DateFormatter

