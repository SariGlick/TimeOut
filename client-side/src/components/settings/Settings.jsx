import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {uploadFile} from './uploadFileUtil.js'
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import Select from '../../stories/Select/Select.jsx'
import {CHANGE_RINGTONE,SEND_PREFERENCE,SELECT_LANGUAGES} from './constantSetting.js'

const Settings = ({currentUser}) => {
    const {emailFrequency,sendNotificationTime,_id}= currentUser.preference
    const url=process.env.REACT_APP_BASE_URL;
    const preferencesUrl=`${url}/preferences/${_id}`
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [audioSrc,setAudioSrc]  = useState();
    const [lng,setLng] = useState('en');
    const {t,i18n}= useTranslation();
    const handleFileChange=(e) => {
         if(e.target.files[0])
         { 
            setRingtoneFile(e.target.files[0]);
            setAudioSrc(URL.createObjectURL(e.target.files[0]));
         }
          
    };
    
     const handleLngChange=(value)=>{
       i18n.changeLanguage(value);
          setLng(value)
     }
   

    const sendPreference = async () => {
        const formData = new FormData();
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('emailFrequency',emailFrequency);
        formData.append('language',lng)
        uploadFile(preferencesUrl,formData,'put')
    };
    
    
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
          options={[{text:'עברית',value:'he'}, {text:'española',value:'es'},{text:'english',value:'en',}]} 
          className='select-des' 
          size={'large'}
          widthOfSelect='200px'
          value={lng}
          onChange={e=>handleLngChange(e.target.value)}/>
        </div>
        
        
        
  
          <GenericButton size='small'  label={t(SEND_PREFERENCE)} onClick={sendPreference} className='but-design' disabled={false}/>
      </>
         
    );
};
 Settings.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Settings;
