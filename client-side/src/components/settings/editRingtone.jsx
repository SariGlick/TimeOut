import React, { useState } from 'react';
import axios from 'axios';
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import ResponsiveAppBar from '../../stories/header/header.jsx';
import { Sync } from '@mui/icons-material';
import './settingPage.scss';
import { formatDate } from '@storybook/blocks';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import Button from '@mui/material/Button';

const RingtoneEditButton = (currentUser) => {
   
    const preferencesId=currentUser.currentUser.preferences._id;
    const userId=currentUser.currentUser._id;
    let sendNotificationTime = currentUser.currentUser.preferences.sendNotificationTime;
    let  emailFrequency= currentUser.currentUser.preferences.emailFrequency;
    const url=process.env.REACT_APP_BASE_URL;
    const [ringtoneFile, setRingtoneFile] = useState(null);
    const [imageFile,setImageFile]= useState(null);
    // const [image, setImage] = useState(null);
     const [preview, setPreview] = useState(null);
     const [audioSrc,setAudioSrc]  = useState();
    const handleFileChange=(e) => {
         console.log('at handle file ');
         setRingtoneFile(e.target.files[0]);
         console.log('file',ringtoneFile);
         if(e.target.files[0])
         {
          const audioUrl= URL.createObjectURL(e.target.files[0]);
          console.log('audioUrl',audioUrl);
          setAudioSrc(URL.createObjectURL(e.target.files[0]));
         }
          
    };
    

    const handleUpload = async () => {
       
        const formData = new FormData();
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('emailFrequency',emailFrequency);
          try {
            const response = await axios.put(`${url}/preferences/${preferencesId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response)
              console.log('response ',response.data);
          } catch (error) {
            if(error.response)
             console.log('Response data :',error.response.data);
          }
           
    };
    
    
    return (
    
         <div> 
          <div className='uploadWarper'>
            <GenericInput  type='file'  label='change ringtone' onChange={handleFileChange} size='medium' disabled={false}/>
          </div>
          <div>
          { audioSrc &&
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
          </div>       
          <GenericButton size='small'  label='send preference' onClick={handleUpload} className='' disabled={false}/>

        </div>
        

       
        
    );
};

export default RingtoneEditButton;
