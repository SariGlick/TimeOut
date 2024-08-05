import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx'
import CONSTANTS from './constantSetting.js'
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { uploadFile } from './uploadFileUtil.js'
import moment from 'moment-timezone';

const createTimeZones = () => {
  return moment.tz.names().map(timezone => ({
    value: timezone,
    text: timezone,
  }));
};

const Preferences = ({ currentUser = {} }) => {
  const { MESSAGES, TITLES, LABELS, LANGUAGE } = CONSTANTS;
  const { timeZone: initialTimeZone, language: initialLanguage, _id: preferenceId } = currentUser.preference;
  const [language, setLanguage] = useState(initialLanguage);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const preferencesUrl = `${baseUrl}/preferences/${preferenceId}`
  const { t, i18n } = useTranslation();


  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setLanguage(value)
  }

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('language', language);
    formData.append('timeZone', timeZone);

    try {
      await uploadFile(preferencesUrl, formData, 'put');
      setToastType('success');
      setToastMessage(MESSAGES.SUCCESS_UPDATED_SETTINGS);
    } catch (error) {
      setToastType('error');
      setToastMessage(MESSAGES.ERROR_UPDATE_SETTINGS);
    } finally {
      setToastOpen(true);
    }
  };

  const handleChangeTimeZone = (selectedTimeZone) => {
    setTimeZone(selectedTimeZone);
  };
  const handleToastClose = () => {
    setToastOpen(false); 
  };

  return (
    <div>
      <Select
        title={t(LABELS.SELECT_LANGUAGES)}
        options={Object.keys(LANGUAGE).map(key => ({
          value: key,
          text: LANGUAGE[key]['text'],
          iconSrc: LANGUAGE[key]['icon']
        }))}
        className='select-class'
        size='medium'
        widthOfSelect='210px'
        value={language}
        onChange={handleLanguageChange}
      />
      <Select
        className='select-time-zone'
        options={createTimeZones().map(tz => ({
          text: tz.text,
          value: tz.value
        }))}
        title={t(LABELS.SELECT_TIME_ZONE)}
        onChange={handleChangeTimeZone}
        value={timeZone}
        size='medium'
        widthOfSelect='210px'
      />

      <GenericButton
        className='Update User Settings'
        label={t(LABELS.UPDATE)}
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
  )
};
Preferences.propTypes = {
  currentUser: PropTypes.object.isRequired
}
export default Preferences;
