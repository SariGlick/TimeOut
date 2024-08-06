
import React, { useState } from 'react';
import CONSTANTS from '../../constants/index.js'
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { uploadFile } from '../settings/uploadFileUtile.js'
import PropTypes from 'prop-types';

const DateFormatSelect = ({ currentUser }) => {
  const {LABELS,DATE_FORMATS,TITLES} =CONSTANTS
  const { formatedDate } = currentUser;
  const [dateFormat, setDateFormat] = useState(formatedDate || 'MM-dd-yyyy');

  const baceUrl = process.env.REACT_APP_BASE_URL;
 
  const sendFormatDate = async () => {
    try {
      const formData = new FormData();
      formData.append('dateFormat', dateFormat);

      const url = `${baceUrl}/users/${currentUser._id}`;
      await uploadFile(url, formData, 'put');
  
    } catch (error) {
      console.error('Error sending format date:', error);
    }
  };
  
  const handleChange = (value) => {
    setDateFormat(value);
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
        onChange={handleChange}
        title={TITLES.SELECT_EMAIL_FREQUENCY}
        size='large'
        widthOfSelect='210px'
      />
      <GenericButton
       className='send format date'
       onClick={sendFormatDate} 
       size='medium'
       label={LABELS.SEND_FORMAT_DATE}
         />
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
    }),
    formatedDate: PropTypes.string,
  }).isRequired,
};

export default DateFormatSelect;