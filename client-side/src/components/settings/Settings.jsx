import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import Select from '../../stories/Select/Select.jsx'

const Setting = (currentUser) => {
   
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
     const [lng,setLng]=useState();
     const {t,i18n}= useTranslation();
    //  const lngs ={
    //   he: {
    //     icon: '🇮🇱',
    //     name: 'Hebrew'
    //   },
    //   en: {
    //     icon: '🇺🇸',
    //     name: 'English'
    //   },
    //   es: {
    //     icon: '🇪🇸',
    //     name: 'Spanish'
    //   }
    // };
       
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
    
     const handleLngChange=(value)=>{
       i18n.changeLanguage(value);
          setLng(value)
     }
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
            <GenericInput  type='file'  label={t('change-ringtone')} onChange={handleFileChange} size='medium' disabled={false}/>
          </div>
          <div>
          { audioSrc &&
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
          </div>       
          <GenericButton size='small'  label={t('send-ringtone')} onClick={handleUpload} className='' disabled={false}/>

         <Select  title='sleect language' 
          options={[{text:'עברית',value:'he'}, {text:'española',value:'es'},{text:'english',value:'en',}]} 
          className='' 
          size={'large'}
          widthOfSelect='200px'
          onChange={e=>handleLngChange(e.target.value)}/>
        </div>
        

       
        
    );
};

export default Setting;
