import React, { useState } from 'react';
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


const Settings = ({ user }) => {
  const [emailFrequency, setEmailFrequency] = useState(Object.keys(emailFrequencyEnum)[0]);
  const [message, setMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const preferenceId=user.preference._id;


  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);

    try {
       await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Email frequency preference updated successfully!');
    } catch (error) {
      console.error('Error updating email frequency preference:', error);
      setMessage('Error updating email frequency preference. Please try again later.');
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