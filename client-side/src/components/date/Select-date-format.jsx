
import React, { useState } from 'react';
import axios from 'axios';
import {DATE_FORMATS} from '../../constants.js'
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import PropTypes from 'prop-types';

const DateFormatSelect = ({ currentUser }) => {
  const { formatedDate } = currentUser;
  const [dateFormat, setDateFormat] = useState(formatedDate || 'yyyy-MM-dd');

  const url = process.env.REACT_APP_BASE_URL;

  const sendFormatDate = async () => {
    try {
      const response = await axios.put(`${url}/users/${currentUser._id}`);
    } catch (error) {
      console.error('Error sending format date:', error);
    }
  };
  return (
    <div className="dateWrapper">
      <Select
        className='select-data-frequency'
        options={DATE_FORMATS.map(formatOption => ({
          value: formatOption.value,
          text: formatOption.label,
          }))}
        value={dateFormat}
        onChange={setDateFormat}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />
      <GenericButton className='send format date' onClick={sendFormatDate} size='medium' label='send format date'/>
    </div>
  );
  
};

DateFormatSelect.propTypes = {
  currentUser: PropTypes.shape({
    preferences: PropTypes.shape({
      emailFrequency: PropTypes.string,
      sendNotificationTime: PropTypes.number,
      soundVoice: PropTypes.string,
      _id: PropTypes.string,
    }).isRequired,
    formatedDate: PropTypes.string,
  }).isRequired,
};

export default DateFormatSelect;





