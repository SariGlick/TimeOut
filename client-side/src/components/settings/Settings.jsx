import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import { useTranslation } from 'react-i18next'
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import {uploadFile} from './uploadFileUtil.js'
import {CHANGE_RINGTONE,SEND_PREFERENCE,LANGUAGE,SELECT_LANGUAGES,CHANGE_NOTIFICATION_TIME} from './constantSetting.js'
import Select from '../../stories/Select/Select.jsx'
const Settings = ({currentUser={}}) => {
    const {emailFrequency,sendNotificationTime,_id,soundVoice}= currentUser.preferences
    const url=process.env.REACT_APP_BASE_URL;
    const preferencesUrl=`${url}/preferences/${_id}`
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [audioSrc,setAudioSrc]  = useState();
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

            <GenericInput  type='file'  label={t(CHANGE_RINGTONE)} onChange={handleFileChange} size='medium'  />
          </div>
          <div>
            {audioSrc && <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
            
          </div>       

         <Select  title={t(SELECT_LANGUAGES)} 
          options={[{text:LANGUAGE.he,value:'he'}, {text:LANGUAGE.es,value:'es'},{text:LANGUAGE.en,value:'en',}]} 
          className='' 
          size={'large'}
          widthOfSelect='200px'
          value={lng}
          onChange={e=>handleLngChange(e.target.value)}/>
        </div>          
        
         <GenericButton size='small'  label={t(SEND_PREFERENCE)} onClick={sendPreference} className='' disabled={false}/>

          <GenericInput size='small'  label={t(CHANGE_NOTIFICATION_TIME)} onChange={changeNotificationTime} type='number' className='' disabled={false}/>
          <GenericButton size='small'  label={t(SEND_PREFERENCE)} onClick={sendPreference} className='' disabled={false}/>
          

      </>
         
    );
};
 Settings.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Settings;
