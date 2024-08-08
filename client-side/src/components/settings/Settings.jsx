import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { selectAuth } from '../../redux/auth/auth.selector';
import { useSelector } from 'react-redux';
import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import Preferences from './Preferences.jsx';
import AccountTab from './AccountTab.jsx';
import Notifications from './Notifications.jsx';
import CONSTANTS from './constantSetting.js'
import { useSnackbar } from 'notistack';
import { updatePreference } from '../../services/preferenceService.js';
import {updateUser}  from '../../services/userService.js'
import './Settings.scss';

const Settings = () => {
  const {MESSAGES, LABELS } = CONSTANTS;
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectAuth)
  const [notificationsData, setNotificationsData] = useState({});
  const [preferencesData, setPreferencesData] = useState({});
  const [currentUser,setCurrentUser]= useState({})
 
  let preferenceId = ''
  let userId =''
  if(user._id)
  {
    preferenceId=user.preference._id;
    userId=user._id
  }

  const elements = [
    <AccountTab onUpdate={setCurrentUser}/>,
    <Notifications currentUser={user} onUpdate={setNotificationsData}/>,
    <Preferences currentUser={user} onUpdate={setPreferencesData}/>
  ]

  const handleFormSubmit = async () => {
    const formData = new FormData();
    const userFormData= new FormData();
    Object.entries(notificationsData).forEach(([key, value]) => {
      if (key === 'ringtoneFile' && value) {
        formData.append('soundVoice', value);
      } else {
        formData.append(key, value);
      }
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
    
    Object.entries(currentUser).forEach(([key,value])=>{
        userFormData.append(key,value)
    })
    try {
      await updateUser(userId,userFormData)
    } catch (error) {
      enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_UPDATE_USER} type="error" />);

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
        label={t(LABELS.UPDATE)}
        size='medium'
        onClick={handleFormSubmit}
      />
      </div>
    </div>
  )
}
export default Settings;
