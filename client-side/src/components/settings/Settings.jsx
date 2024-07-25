import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import Select from '../../stories/Select/Select.jsx'
import {uploadFile} from './uploadFileUtil.js'
import {LANGUAGE,LABELS} from './constantSetting.js'
const Settings = ({currentUser={}}) => {
    const {emailFrequency,sendNotificationTime,_id,soundVoice}= currentUser.preferences
    const url=process.env.REACT_APP_BASE_URL;
    const preferencesUrl=`${url}/preferences/${_id}`
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [audioSrc,setAudioSrc]  = useState(`${url}/uploads/${soundVoice}`);
    const [notificationTime,setNotificationTime]= useState(sendNotificationTime);
    const [lng,setLng] =useState('en');
    const {t,i18n}= useTranslation();
    const handleFileChange=(e) => {
         if(e.target.files[0])
         { 
            setRingtoneFile(e.target.files[0]);
            const audioUrl= URL.createObjectURL(e.target.files[0]);
            setAudioSrc(URL.createObjectURL(e.target.files[0]));
         }
          
    };
    
     const handleLngChange=(value)=>{
       i18n.changeLanguage(value);
          setLng(value)
     }
   
     const changeNotificationTime=(event)=>{
         setNotificationTime(event);
     }
    const sendPreference = async () => {
        const formData = new FormData();
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',notificationTime);
        formData.append('emailFrequency',emailFrequency);
        uploadFile(preferencesUrl,formData,'put')
    };
    
    return (
      <> 
        <div> 
          <div className='uploadWarper'>

            <GenericInput  type='file'  label={t(LABELS.CHANGE_RINGTONE)} onChange={handleFileChange} size='medium'  />
          </div>
          <div>
             <audio controls>
               <source src={audioSrc} ></source>
            </audio>
            
          </div>       

         <Select  title={t(LABELS.SELECT_LANGUAGES)} 
          options={[{text:LANGUAGE.he,value:'he'}, {text:LANGUAGE.es,value:'es'},{text:LANGUAGE.en,value:'en',}]} 
          className='' 
          size={'large'}
          widthOfSelect='200px'
          value={lng}
          onChange={e=>handleLngChange(e.target.value)}/>
        </div>          
          <GenericInput size='small'  label={t(LABELS.CHANGE_NOTIFICATION_TIME)} onChange={changeNotificationTime} type='number' className='' />
          <GenericButton size='small'  label={t(LABELS.SEND_PREFERENCE)} onClick={sendPreference} className='but-send'/>
      </>
         
    );
};
 Settings.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Settings;
