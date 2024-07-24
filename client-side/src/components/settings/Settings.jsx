import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import {uploadFile} from './uploadFileUtil.js'
import {CHANGE_RINGTONE,SEND_PREFERENCE} from './constantSetting.js'

const Settings = ({currentUser={}}) => {
    const {emailFrequency,sendNotificationTime,_id,soundVoice}= currentUser.preferences
    const userId=currentUser._id;
    const url=process.env.REACT_APP_BASE_URL;
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [audioSrc,setAudioSrc]  = useState(soundVoice);

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
         console.log('notificationTime',notificationTime);
     }
    const sendPreference = async () => {
        const formData = new FormData();
        const preferencesUrl=`${url}/preferences/${_id}`
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('emailFrequency',emailFrequency);
        uploadFile(preferencesUrl,formData,'put')
    };
    const sendNotification =()=>{

    }
    
    return (
      <> 
      <div> 
          <div className='uploadWarper'>

            <GenericInput  type='file'  label={t(CHANGE_RINGTONE)} onChange={handleFileChange} size='medium'  />
          </div>
          <div>
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>
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

          <GenericInput size='small'  label={t(CHANGE_NOTIFICATION)} onChange={changeNotificationTime} type='number' className='' disabled={false}/>
          <GenericButton size='small'  label={t(SEND_PREFERENCE)} onClick={sendPreference} className='' disabled={false}/>
          <GenericButton size='small'  label={'send notification time'} onClick={sendNotification} className='' disabled={false}/>


      </>
         
    );
};
 Settings.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Settings;
