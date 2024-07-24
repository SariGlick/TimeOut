import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import CONSTANTS from '../../constants/index.jsx'



const Settings = ({ currentUser }) => {
  const { EMAIL_FREQUENCY_ENUM, MESSAGES, TITLES, LABELS } = CONSTANTS;
  const {emailFrequency: initialEmailFrequency,_id:preferenceId } = currentUser.preference;
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [message, setMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;


  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);

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


  return (
    <div>
      <h2>Settings</h2>
      <Select
        className='select-email-frequency'
        options={Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
          text: key.toLowerCase(),
          value: EMAIL_FREQUENCY_ENUM[key],
          icon: '⏰'
        }))}
        title={TITLES.SELECT_EMAIL_FREQUENCY}
        onChange={handleChangeEmailFreq}
        value={emailFrequency}
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
Settings.propTypes={
  currentUser: PropTypes.object.isRequired
}

export default Settings;