import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx'
import Preferences from './Preferences.jsx';
import AccountTab from './AccountTab.jsx';
import Notifications from './Notifications.jsx';
import CONSTANTS from './constantSetting.js'
import { useSnackbar } from 'notistack';
import { updatePreference } from '../../services/preferenceService.js';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/auth.selector.js'
import './Settings.scss';

const Settings = () => {
  const { MESSAGES, LABELS } = CONSTANTS;
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector(selectAuth);

  const [notificationsData, setNotificationsData] = useState({});
  const [preferencesData, setPreferencesData] = useState({});

  const preferenceId = user.preference._id;

  const elements = [
    <AccountTab />,
    <Notifications onUpdate={setNotificationsData} />,
    <Preferences onUpdate={setPreferencesData} />
  ]

  const handleFormSubmit = async () => {
    
    const formData = new FormData();
    Object.entries(notificationsData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(preferencesData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await updatePreference(preferenceId, formData);
      enqueueSnackbar(<ToastMessage message={MESSAGES.SUCCESS_UPDATED_SETTINGS} type="success" />);
    } catch (error) {
      enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_UPDATE_SETTINGS} type="error" />);
    }
  };

  return (
    <div className="settings-container">
      <div className="tabs-container">
        <VerticalTabs labels={[LABELS.ACCOUNT, LABELS.NOTIFICATIONS, LABELS.PREFERENCE, LABELS.DISPLAY_SETTING, LABELS.MESSAGE]} elements={elements} />
      </div>
      <div className="button-container">
        <GenericButton
          className='UpdateSettings'
          label={translate(LABELS.UPDATE)}
          size='medium'
          onClick={handleFormSubmit}
        />
      </div>
    </div>
  )
}
export default Settings;
