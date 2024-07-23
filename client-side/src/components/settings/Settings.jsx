import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { EMAIL_FREQUENCY_ENUM, MESSAGES, TITLES, LABELS } from '../../constants/index.jsx';


const createTimeZones = () => {
  const timeZones = [];
  for (let i = -12; i <= 12; i++) {
    const offset = i >= 0 ? `+${i}` : `${i}`;
    timeZones.push({
      value: `GMT${offset}:00`,
      label: `GMT${offset}:00`,
    });
  }
  return timeZones;
};


const Settings = ({user}) => {
  const [timeZone, setTimeZone] = useState('GMT±00:00'); 
  const [emailFrequency, setEmailFrequency] = useState( EMAIL_FREQUENCY_ENUM.NEVER);
  const [message, setMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const preferenceId = user.preference._id;

  useEffect(() => {
    if (user) {
      setEmailFrequency(user.preference.emailFrequency);
      setTimeZone(user.preference.timeZone);
    }
  }, []);

  const handleFormSubmit = async () => {
    
    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);
    formData.append('timeZone', timeZone);

    try {
      await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {

        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(MESSAGES.EMAIL_FREQUENCY_UPDATED);
    } catch (error) {
      console.error('Error updating email frequency preference:', error);
      setMessage(MESSAGES.EMAIL_FREQUENCY_UPDATE_ERROR);
    }
  };

  const handleChangeEmailFreq = (e) => {
    const selectedFrequency = e.target.value;
    if (!Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase())) {
      setMessage(MESSAGES.INVALID_EMAIL_FREQUENCY);
      return;
    }
    setEmailFrequency(selectedFrequency);
  };

  const handleChangeTimeZone = (e) => {
    const selectedTimeZone = e.target.value;
    setTimeZone(selectedTimeZone);
  };

  return (
    <div>
      <h2>Settings</h2>

      <Select
        className='select-email-frequency'
        options={Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
          text: key.toLowerCase(),
          value: EMAIL_FREQUENCY_ENUM[key.toLowerCase()],
          icon: EMAIL_FREQUENCY_ENUM[key.toLowerCase()] || '⏰'
        }))}
        title={TITLES.SELECT_EMAIL_FREQUENCY}
        onChange={handleChangeEmailFreq}
        value={emailFrequency}
        size='large'
        widthOfSelect='210px'
      />

      <Select
        className='select-time-zone'
        options={createTimeZones().map(tz => ({
          text: tz.label,
          value: tz.value
        }))}
        title='Select Time Zone'
        onChange={handleChangeTimeZone}
        value={timeZone}
        size='large'
        widthOfSelect='210px'
      />

      <GenericButton
        className='Update User Settings'
        label={LABELS.UPDATE_USER_SETTINGS}
        size='medium'
        onClick={handleFormSubmit}
      />

      {/* TO DO: replace message  */}
      <p>{message}</p>
    </div>
  );
};

export default Settings;