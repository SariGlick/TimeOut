import React from 'react'
import { useTranslation } from 'react-i18next'
import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import Preferences from './Preferences.jsx';
import AccountTab from './AccountTab.jsx';
import Notifications from './Notifications.jsx';
import CONSTANTS from './constantSetting.js'
import { uploadFile } from './uploadFileUtil.js'
const user = {
  "_id": "66940b051ccb2852370d5a17",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "securePassword123",
  "visitsWebsites": [],
  "profiles": [],
  "profileImage": "profile.jpg",
  "preference": {
    "sendNotificationTime": 30,
    "soundVoice": "alertSound.mp3",
    "_id": "66930c2e2aad987e24078e12",
    "emailFrequency": "weekly",
    "timeZone": "UTC",
    "language": "he",
    "dateFormat": "DD-MM-YYYY",
  }
}


const Settings = () => {
  const preferenceId = user.preference._id
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const preferencesUrl = `${baseUrl}/preferences/${preferenceId}`
  const { LABELS } = CONSTANTS;
  const { t } = useTranslation();

  const elements = [
    <AccountTab />,
    <Notifications currentUser={user} />,
    <Preferences currentUser={user} />
  ]

  const handleFormSubmit = async () => {
    const formData = new FormData();
    // formData.append('language', language);
    // formData.append('timeZone', timeZone);
    // formData.append('dateFormat', dateFormat);

    try {
      await uploadFile(preferencesUrl, formData, 'put');
      // enqueueSnackbar(<ToastMessage message={MESSAGES.SUCCESS_UPDATED_SETTINGS} type="success" />);
    } catch (error) {
      // enqueueSnackbar(<ToastMessage message={MESSAGES.ERROR_UPDATE_SETTINGS} type="error" />);
    }
  };

  return (
    <div>
      <div>
      <VerticalTabs labels={[LABELS.ACCOUNT, LABELS.NOTIFICATIONS, LABELS.PREFERENCE, LABELS.DISPLAY_SETTING, LABELS.MESSAGE]} elements={elements} />
      </div>
      <div>
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
