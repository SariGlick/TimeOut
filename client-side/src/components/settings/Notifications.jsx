import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx'
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import { uploadFile } from './uploadFileUtil.js'
import CONSTANTS from './constantSetting.js'
import './Notifications.scss'; 

const Notifications = ({ currentUser = {} }) => {
  const { EMAIL_FREQUENCY_ENUM, MESSAGES, TITLES, LABELS } = CONSTANTS;
  const { sendNotificationTime, soundVoice, emailFrequency: initialEmailFrequency, _id: preferenceId } = currentUser.preference;
  const url = process.env.REACT_APP_BASE_URL;
  const preferencesUrl = `${url}/preferences/${preferenceId}`
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [ringtoneFile, setRingtoneFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState(`${url}/uploads/${soundVoice}`);
  const [notificationTime, setNotificationTime] = useState(sendNotificationTime);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setRingtoneFile(e.target.files[0]);
      setAudioSrc(URL.createObjectURL(e.target.files[0]));
    }

  };
  const handleChangeEmailFreq = (selectedFrequency) => {
    if (!Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase())) {
      setToastType('warning');
      setToastMessage(MESSAGES.INVALID_EMAIL_FREQUENCY);
      setToastOpen(true);
      return;
    }
    setEmailFrequency(selectedFrequency);
  };
  const handleToastClose = () => {
    setToastOpen(false);
  };

  const changeNotificationTime = (event) => {
    setNotificationTime(event);
  }
  const sendPreference = async () => {
    const formData = new FormData();
    formData.append('soundVoice', ringtoneFile);
    formData.append('sendNotificationTime', notificationTime);
    formData.append('emailFrequency', emailFrequency);
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

  return (
    <div className="notifications-container">
    <div className="select-container">
      <Select
        className='select-email-frequency'
        options={Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
          text: t(key.toLowerCase()),
          value: EMAIL_FREQUENCY_ENUM[key]
        }))}
        title={t(TITLES.SELECT_EMAIL_FREQUENCY)}
        onChange={handleChangeEmailFreq}
        value={emailFrequency}
        size='medium'
        widthOfSelect='210px'
      />
    </div>
    <div className="input-container">
      <GenericInput
        size='medium'
        width='210px'
        label={t(LABELS.CHANGE_NOTIFICATION_TIME)}
        onChange={changeNotificationTime}
        value={notificationTime}
        type='number'
        className='gInput'
        min={0} max={60}
      />
    </div>
    <div className="file-container">
      <GenericInput
        type='file'
        label={t(LABELS.CHANGE_RINGTONE)}
        onChange={handleFileChange}
        size='medium'
        width='210px'
        accept='audio/mp3'
      />
      <audio controls className="audio-player">
        <source src={audioSrc} />
      </audio>
    </div>
    <GenericButton
      size='medium'
      label={t(LABELS.UPDATE)}
      onClick={sendPreference}
      className='but-send'
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
Notifications.propTypes = {
  currentUser: PropTypes.object.isRequired
}
export default Notifications;
