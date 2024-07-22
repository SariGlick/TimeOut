import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import Select from '../../stories/Select/Select.jsx'
import {CHANGE_RINGTONE,SEND_PREFERENCE,SELECT_LANGUAGES} from './constantSetting.js'

const Setting = ({currentUser}) => {
    const {emailFrequency,sendNotificationTime,_id}= currentUser.preferences
    const url=process.env.REACT_APP_BASE_URL;
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [audioSrc,setAudioSrc]  = useState();
    const [lng,setLng] = useState('en');
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
   

    const sendPreference = async () => {
       
        const formData = new FormData();
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('emailFrequency',emailFrequency);
          try {
            const response = await axios.put(`${url}/preferences/${_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
          } catch (error) {
             console.error(error)
          }  
    };
    
    
    return (
      <> 
      <div> 
          <div className='uploadWarper'>

            <GenericInput  type='file'  label={t(CHANGE_RINGTONE)} onChange={handleFileChange} size='medium'  />
          </div>
          <div>
          { audioSrc &&
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
          </div>       

         <Select  title={t(SELECT_LANGUAGES)} 
          options={[{text:'עברית',value:'he'}, {text:'española',value:'es'},{text:'english',value:'en',}]} 
          className='' 
          size={'large'}
          widthOfSelect='200px'
          value={lng}
          onChange={e=>handleLngChange(e.target.value)}/>
        </div>
        
        
        
  
          <GenericButton size='small'  label={t(SEND_PREFERENCE)} onClick={sendPreference} className='' disabled={false}/>
      </>
         
    );
};
 Setting.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Setting;
