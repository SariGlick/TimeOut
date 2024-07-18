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

const EmailFrequency = () => {
  const [message, setMessage] = useState('');
  const preferenceId = '66930c2e2aad987e24078e12';//TO DO: get from props
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleFormSubmit = async () => {
    const selectElement = document.querySelector('.select-email-frequency select');
    const selectedFrequency = selectElement.value;

    if (!Object.keys(emailFrequencyEnum).includes(selectedFrequency)) {
      setMessage('Invalid email frequency selected. Please choose a valid option.');
      return;
    }
    const formData = new FormData();
    formData.append('emailFrequency', selectedFrequency);

    try {
      const response = await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
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

  const getIconForFrequency = (frequency) => {
    return emailFrequencyEnum[frequency] || '⏰';
  };
  return (
    <div>
      <Select
        className='select-email-frequency'
        options={Object.keys(emailFrequencyEnum).map(key => ({
          text: key.toLowerCase(),
          value: key,
          icon: getIconForFrequency(key)
        }))}
        title='Select Email Frequency'
        value={selectedFrequency}
        onChange={(e) => setSelectedFrequency(e.target.value)}
        size='large'
        widthOfSelect='210px'
      />
      <GenericButton
        className='Update Email Frequency'
        label='Update Email Frequency'
        size='medium'
        onClick={handleFormSubmit}
      />
      {/* TO DO: replace message  */}
      <p>{message}</p>
    </div>
  );
};

export default EmailFrequency;
