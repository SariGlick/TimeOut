import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import CONSTANTS from '../../constants/index.js';
import {uploadFile} from './uploadFileUtil.js'


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


const Settings = ({ currentUser={} }) => {
  const { EMAIL_FREQUENCY_ENUM, MESSAGES, TITLES, LABELS } = CONSTANTS;
  const { emailFrequency: initialEmailFrequency, timeZone: initialTimeZone, _id: preferenceId } = currentUser.preference;
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [message, setMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleFormSubmit = async () => {

    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);
    formData.append('timeZone', timeZone);
    const preferencesUrl = `${baseUrl}/preferences/${preferenceId}`
    try {
      const response = await uploadFile(preferencesUrl, formData, 'put');
      setMessage(MESSAGES.SUCCESS_UPDATED_SETTINGS); 
    } catch (error) {
      setMessage(MESSAGES.ERROR_UPDATE_SETTINGS);
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
          value: EMAIL_FREQUENCY_ENUM[key],
          icon: '⏰'
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
Settings.propTypes = {
  currentUser: PropTypes.object.isRequired
}

export default Settings;