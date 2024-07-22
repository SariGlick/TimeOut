import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';

const emailFrequencyEnum = {
  'never': '🚫',
  'daily': '📅',
  'weekly': '🗓️',
  'monthly': '📆',
  'yearly': '📅'
};

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


const Settings = ({ user }) => {
  const [emailFrequency, setEmailFrequency] = useState(Object.keys(emailFrequencyEnum)[0]);
  const [timeZone, setTimeZone] = useState('GMT±00:00'); 
  const [message, setMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const preferenceId = user.preference._id;

  useEffect(() => {
    if (user.preference.emailFrequency) {
      setEmailFrequency(user.preference.emailFrequency);
    }
    if (user.preference.timeZone) {
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
      setMessage('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating email frequency preference:', error);
      setMessage('Error updating preferences. Please try again later.');
    }
  };

  const handleChangeEmailFreq = (e) => {
    const selectedFrequency = e.target.value;
    if (!Object.keys(emailFrequencyEnum).includes(selectedFrequency)) {
      setMessage('Invalid email frequency selected. Please choose a valid option.');
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
        options={Object.keys(emailFrequencyEnum).map(key => ({
          text: key.toLowerCase(),
          value: key,
          icon: emailFrequencyEnum[key] || '⏰'
        }))}
        title='Select Email Frequency'
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
        label='Update User Settings'
        size='medium'
        onClick={handleFormSubmit}
      />

      {/* TO DO: replace message  */}
      <p>{message}</p>
    </div>
  );
};

export default Settings;