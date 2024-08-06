import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import CONSTANTS from './constantSetting.js'
import './Notifications.scss';

const Notifications = ({ currentUser , onUpdate}) => {
  const { EMAIL_FREQUENCY_ENUM, TITLES, LABELS } = CONSTANTS;
  const { sendNotificationTime:notificationTime, soundVoice:initialSoundVoice,displayIncomeMessages:showIncomeMessages,
     displayBrowsingTimeLimit:showBrowsingTimeLimit, emailFrequency: initialEmailFrequency,  } = currentUser.preference;
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [ringtoneFile, setRingtoneFile] = useState(null);
  const url = process.env.REACT_APP_BASE_URL;
  const [soundVoice, setSoundVoice] = useState(`${url}/uploads/${initialSoundVoice}`);
  const [sendNotificationTime, setSendNotificationTime] = useState(notificationTime);
  const [displayIncomeMessages, setDisplayIncomeMessages] = useState(showIncomeMessages);
  const [displayBrowsingTimeLimit, setDisplayBrowsingTimeLimit] = useState(showBrowsingTimeLimit);
  const { t } = useTranslation();

  useEffect(() => {
    onUpdate({
      emailFrequency,
      ringtoneFile,
      sendNotificationTime,
      displayIncomeMessages,
      displayBrowsingTimeLimit
    });
  }, [emailFrequency, ringtoneFile, sendNotificationTime, displayIncomeMessages, displayBrowsingTimeLimit, onUpdate]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setRingtoneFile(e.target.files[0]);
      setSoundVoice(URL.createObjectURL(e.target.files[0]));
    }

  };
  const handleChangeEmailFreq = (selectedFrequency) => {
    if (!Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase())) {
      return;
    }
    setEmailFrequency(selectedFrequency);
  };
 
  const changeNotificationTime = (event) => {
    setSendNotificationTime(event);
  }
 

  return (
    <div className="notifications-container">
      <div className="notifications-settings">
        <GenericInput
          label={t(LABELS.DISPLAY_INCOME_MESSAGES)}
          type="checkbox"
          checked={displayIncomeMessages}
          onChange={(e) => setDisplayIncomeMessages(e)}
        />
        <GenericInput
          label={t(LABELS.DISPLAY_BROWSING_TIME_LIMIT)}
          type="checkbox"
          checked={displayBrowsingTimeLimit}
          onChange={(e) => setDisplayBrowsingTimeLimit(e)}
        />
      </div>
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
          value={sendNotificationTime}
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
          <source src={soundVoice} />
        </audio>
      </div>
    </div>
  );
};
Notifications.propTypes = {
  currentUser: PropTypes.object.isRequired
}
export default Notifications;
