import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx'
import CONSTANTS from '../../constants/index.js';
import { uploadFile } from './uploadFileUtil.js'
import moment from 'moment-timezone';

const createTimeZones = () => {
  return moment.tz.names().map(timezone => ({
    value: timezone,
    text: timezone,
  }));
};


const Settings = ({ currentUser = {} }) => {
  const { EMAIL_FREQUENCY_ENUM, MESSAGES, TITLES, LABELS, MAIN_TITLE } = CONSTANTS;
  const { emailFrequency: initialEmailFrequency, timeZone: initialTimeZone, _id: preferenceId } = currentUser.preference;
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [toastOpen, setToastOpen] = useState(false);  // State to control ToastMessage
  const [toastType, setToastType] = useState('success');  // Type of the toast
  const [toastMessage, setToastMessage] = useState('');  // Message of the toast
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleFormSubmit = async () => {

    const formData = new FormData();
    formData.append('emailFrequency', emailFrequency);
    formData.append('timeZone', timeZone);
    const preferencesUrl = `${baseUrl}/preferences/${preferenceId}`
    try {
      await uploadFile(preferencesUrl, formData, 'put');
      setToastType('success');
      setToastMessage(MESSAGES.SUCCESS_UPDATED_SETTINGS);
    } catch (error) {
      setToastType('error');
      setToastMessage(MESSAGES.ERROR_UPDATE_SETTINGS);
    } finally {
      setToastOpen(true);  // Show toast message
    }
  };

  const handleChangeEmailFreq = (selectedFrequency) => {
    if (!Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase())) {
      setToastType('warning');
      setToastMessage(MESSAGES.INVALID_EMAIL_FREQUENCY);
      setToastOpen(true);  // Show toast message
      return;
    }
    setEmailFrequency(selectedFrequency);
  };

  const handleChangeTimeZone = (selectedTimeZone) => {
    setTimeZone(selectedTimeZone);
  };
  const handleToastClose = () => {
    setToastOpen(false);  // Close toast message
  };

  return (
    <div>
      <h2>{MAIN_TITLE.SETTINGS}</h2>

      <Select
        className='select-email-frequency'
        options={Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
          text: key.toLowerCase(),
          value: EMAIL_FREQUENCY_ENUM[key]
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
          text: tz.text,
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

      <ToastMessage
        open={toastOpen}
        type={toastType}
        message={toastMessage}
        onClose={handleToastClose}
      />
    </div>
  );
};
Settings.propTypes = {
  currentUser: PropTypes.object.isRequired
}

export default Settings;