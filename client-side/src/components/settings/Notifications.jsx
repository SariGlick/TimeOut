import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import CONSTANTS from './constantSetting.js'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/auth.selector.js'
import './Notifications.scss';

const Notifications = ({ onUpdate }) => {
  const { user } = useSelector(selectAuth);
  const { EMAIL_FREQUENCY_ENUM, TITLES, LABELS } = CONSTANTS;
  const {
    sendNotificationTime: notificationTime = 10,
    soundVoice: initialSoundVoice = "alertSound.mp3",
    displayIncomeMessages: showIncomeMessages = false,
    displayBrowsingTimeLimit: showBrowsingTimeLimit = false,
    emailFrequency: initialEmailFrequency = EMAIL_FREQUENCY_ENUM.NEVER
  } = user.preference || {};
  const [emailFrequency, setEmailFrequency] = useState(initialEmailFrequency);
  const [ringtoneFile, setRingtoneFile] = useState(null);
  const url = process.env.REACT_APP_SERVER_URL;
  const [soundVoice, setSoundVoice] = useState(`${url}/uploads/${initialSoundVoice}`);
  const [sendNotificationTime, setSendNotificationTime] = useState(notificationTime);
  const [displayIncomeMessages, setDisplayIncomeMessages] = useState(showIncomeMessages);
  const [displayBrowsingTimeLimit, setDisplayBrowsingTimeLimit] = useState(showBrowsingTimeLimit);
  const { t: translate } = useTranslation();

  const emailFrequencyOptions = Object.keys(EMAIL_FREQUENCY_ENUM).map(key => ({
    text: translate(key.toLowerCase()),
    value: EMAIL_FREQUENCY_ENUM[key]
  }));

  const prevValues = useRef({
    emailFrequency,
    ringtoneFileName: null,
    sendNotificationTime,
    displayIncomeMessages,
    displayBrowsingTimeLimit
  });

  useEffect(() => {
    
    const changes = {};
    if (prevValues.current.emailFrequency !== emailFrequency) {
      changes.emailFrequency = emailFrequency;
    }
    if (prevValues.current.sendNotificationTime !== sendNotificationTime) {
      changes.sendNotificationTime = sendNotificationTime;
    }
    if (prevValues.current.displayIncomeMessages !== displayIncomeMessages) {
      changes.displayIncomeMessages = displayIncomeMessages;
    }
    if (prevValues.current.displayBrowsingTimeLimit !== displayBrowsingTimeLimit) {
      changes.displayBrowsingTimeLimit = displayBrowsingTimeLimit;
    }
    if (prevValues.current.ringtoneFileName === null) {
      if (ringtoneFile) {
        changes.soundVoice = ringtoneFile;
      }
    } else if (ringtoneFile && prevValues.current.ringtoneFileName !== ringtoneFile.name) {
      changes.soundVoice = ringtoneFile;
    }
    

    if (Object.keys(changes).length > 0) {
      onUpdate(changes);
      prevValues.current = { 
        emailFrequency, 
        ringtoneFileName: ringtoneFile ? ringtoneFile.name : null, 
        sendNotificationTime, 
        displayIncomeMessages, 
        displayBrowsingTimeLimit 
      };
    }
  }, [
    emailFrequency, 
    ringtoneFile, 
    sendNotificationTime, 
    displayIncomeMessages, 
    displayBrowsingTimeLimit, 
    onUpdate
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRingtoneFile(file);
      setSoundVoice(URL.createObjectURL(file));
    } else {
      setRingtoneFile(null);
      setSoundVoice('');
    }

  };
  const handleChangeEmailFreq = (selectedFrequency) => {
    if (!Object.keys(EMAIL_FREQUENCY_ENUM).includes(selectedFrequency.toUpperCase())) {
      return;
    }
    setEmailFrequency(selectedFrequency);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-settings">
        <GenericInput
          label={translate(LABELS.DISPLAY_INCOME_MESSAGES)}
          type="checkbox"
          checked={displayIncomeMessages}
          onChange={setDisplayIncomeMessages}
        />
        <GenericInput
          label={translate(LABELS.DISPLAY_BROWSING_TIME_LIMIT)}
          type="checkbox"
          checked={displayBrowsingTimeLimit}
          onChange={setDisplayBrowsingTimeLimit}
        />
      </div>
      <div className="select-container">
        <Select
          className='select-email-frequency'
          options={emailFrequencyOptions}
          title={translate(TITLES.SELECT_EMAIL_FREQUENCY)}
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
          label={translate(LABELS.CHANGE_NOTIFICATION_TIME)}
          onChange={setSendNotificationTime}
          value={sendNotificationTime}
          type='number'
          className='gInput'
          min={0} max={60}
        />
      </div>
      <div className="file-container">
        <GenericInput
          type='file'
          label={translate(LABELS.CHANGE_RINGTONE)}
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
  currentUser: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}
export default Notifications;
