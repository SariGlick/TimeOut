import React from 'react'
import { useTranslation } from 'react-i18next';
import VerticalTabs from '../../stories/verticalTabs/verticalTabss';
import Preferences from './preferences.jsx';
import AccountTab from './accountTab';
import Notifications from './Notifications.jsx';
import {LABELS} from './constantSetting.js'
const  Settings =()=> {
  const elements = [
    <AccountTab/>,
    <Notifications/>,
    <Preferences/>
  ] 
  const {t} = useTranslation();
  return (
    <> 
    <VerticalTabs labels={[LABELS.ACCOUNT, LABELS.NOTIFICATIONS, LABELS.PREFERENCE, LABELS.DISPLAY_SETTING , LABELS.MESSAGE]} elements={elements}/>
    </>
  )
}
export default  Settings;