import React from 'react'
import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import Preferences from './Preference.jsx';
import AccountTab from './accountTab';
import Notifications from './Notifications.jsx';
import {LABELS} from './constantSetting.js'
const user={
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
      "language": "he"
  }
}


const  Settings =()=> {
  const elements = [
    <AccountTab/>,
    <Notifications currentUser={user}/>,
    <Preferences currentUser={user}/>
  ] 
  return (
    <> 
    <VerticalTabs labels={[LABELS.ACCOUNT, LABELS.NOTIFICATIONS, LABELS.PREFERENCE, LABELS.DISPLAY_SETTING , LABELS.MESSAGE]} elements={elements}/>
    </>
  )
}
export default  Settings;
