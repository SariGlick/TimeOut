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
    const sendPreference = async () => {
        const formData = new FormData();
        const preferencesUrl=`${url}/preferences/${_id}`
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('emailFrequency',emailFrequency);
        uploadFile(preferencesUrl,formData,'put')
    };
    
    
    return (
    
         <div> 
          <div className='uploadWarper'>
            <GenericInput  type='file'  label={CHANGE_RINGTONE} onChange={handleFileChange} size='medium'  />
          </div>
          <div>
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>
          </div>       
          <GenericButton size='small'  label={SEND_PREFERENCE} onClick={sendPreference} className='buttonInput' disabled={false}/>
        </div>  
    );
};
 Settings.propTypes={
    currentUser: PropTypes.object.isRequired
 }
 export default Settings;
