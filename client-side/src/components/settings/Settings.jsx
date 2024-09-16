import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { selectAuth } from '../../redux/auth/auth.selector';
import { updatePreference } from '../../services/preferenceService.js';
import {updateUser}  from '../../services/userService.js';
import {  updateUserDetails } from '../../redux/user/user.slice';
import { useNavigate } from 'react-router-dom'; 
import {TOAST_MESSAGES} from '../../constants';

import Preferences from './Preferences.jsx';
import AccountTab from './AccountTab.jsx';
import Notifications from './Notifications.jsx';
import CONSTANTS from './constantSetting.js';
import './Settings.scss';

const Settings = () => {
  const {MESSAGES, LABELS } = CONSTANTS;
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectAuth);
  const [notificationsData, setNotificationsData] = useState({});
  const [preferencesData, setPreferencesData] = useState({});
  const [updatedUser,setUpdatedUser]= useState({});
 const dispatch = useDispatch();
  const navigate =useNavigate();
  let preferenceId = '';
  let userId =user.id || '66d49dbc7d55dde5372e67f0';
  if(user._id)
  {
    preferenceId=user.preference._id;
    userId=user._id;
  }
const setUserChanges =(value)=>{
    setUpdatedUser(prev=>({...prev, ...value}));
};

  const elements = [
    <AccountTab onUpdate={setUserChanges} key='' updatedUser={updatedUser}/>,
    <Notifications currentUser={user} onUpdate={setNotificationsData} key=''/>,
    <Preferences currentUser={user} onUpdate={setPreferencesData} key=''/>
  ];
   
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
    
    Object.entries(updatedUser).forEach(([key,value])=>{
      
      userFormData.append(key,value);
    });
    try {
      const newUser= await updateUser(userFormData,userId); 
      dispatch(updateUserDetails(newUser));
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_SUCCESS} type="success" />);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_ERROR_UNAUTHORIZED} type="error" />);
      }else{
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_ERROR} type="error" />);
      }
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
  );
};
export default Settings;
