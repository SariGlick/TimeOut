import React, { useState } from 'react';
import axios from 'axios';
import GenericButton  from '../stories/Button/GenericButton';
import ResponsiveAppBar from '../stories/header/header.jsx';
import { Sync } from '@mui/icons-material';
import './settingPage.scss';
import { formatDate } from '@storybook/blocks';
const RingtoneEditButton = () => {

   const currentUser={
    
      "_id": "66965a8c564fb1e231e9a724",
      "name": "shira",
      "email": "sh3000444@gmail.com",
      "password": "$2b$10$Am.U1AyLaloaPqkmmLljfukcJy0v6Zg2P1Du2lERWj7hl9I4dPvou",
      "googleId": "hghgh677",
      "profileImage": "×¡×\u0095×¡.jpg",
      "visitsWebsites": [
        {
          "_id": "669643fbce49127203270a75",
          "websiteId": "668cf5bfc208464f57155d29",
          "visitsTime": [
            {
              "visitDate": "2024-07-16T09:18:24.000Z",
              "activityTime": 34,
              "_id": "669643fbce49127203270a76"
            }
          ],
          "__v": 0
        }
      ],
      "profiles": [
        {
          "_id": "669625682d5d32a4e340398d",
          "profileName": "personal",
          "blockedSites": [
            "668cf5bfc208464f57155d29"
          ],
          "limitedWebsites": [
            {
              "websiteId": "668cf5bfc208464f57155d29",
              "status": "block",
              "limitedTimes": [
                {
                  "start": "2023-07-12T15:00:00.000Z",
                  "end": "2023-07-12T15:00:00.000Z",
                  "_id": "669625682d5d32a4e340398f"
                }
              ],
              "_id": "669625682d5d32a4e340398e"
            }
          ],
          "__v": 0
        }
      ],
      "preferences": {
        "_id": "66953d2791606a13857abd26",
        "emailFrequency": "weekly",
        "sendNotificationTime": 56,
        "soundVoice": "× ×\u0095×ª×\u0099 ×\u009c×\u0099×\u0091×¨×\u009e×\u009f - ×\u0099×\u009d ×©×\u009c ×\u0093×\u009e×¢×\u0095×ª.mp3",
        "__v": 0
      }
   
    };
    const preferencesId=currentUser.preferences._id;
    const userId=currentUser._id;
    let id='66953d2791606a13857abd26';
    let sendNotificationTime = 56;
    let  sendEmail= 'never';
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
        console.log('url=',url);
        console.log('preferencesId',preferencesId);
        const formData = new FormData();
         if(ringtoneFile)
         {
            console.log('file',ringtoneFile);
            
         }
        formData.append('soundVoice', ringtoneFile);
        formData.append('sendNotificationTime',sendNotificationTime);
        formData.append('EmailFrequency',sendEmail);
          try {
            const response = await axios.put(`${url}/preferences/${preferencesId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response)
              console.log('response ',response.data);
          } catch (error) {
            console.error('Error uploading file:', error);
            if(error.response)
             console.log('Response data :',error.response.data);
          }
           
    };
    
    const handleFilePicture = (e) => {
      if (e) {
        console.log('at handleFilePicture the  file is ' ,e.target.files[0]);
        setImageFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        if(e.target.files[0])
        {
           reader.readAsDataURL(e.target.files[0]);
        }
         
      }
    };

    const handleUploadPicture = async () => {
      const formData = new FormData();
      console.log('userId',userId);
      // if (!file) {
      //   alert('Please select an image first.');
      //   return;
      // }
      // if(file){
      //   console.log('file',file);
      // }
      formData.append('profileImage', imageFile);
     
      try {
        const response = await axios.put(`${url}/users/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Profile image updated successfully!');
      } catch (error) {
        console.log('Response data :',error.response.data);
        alert('Failed to update profile image.');
      }
    };
    return (
    
         <div> 
           <h2  className='font'>change  user preferences</h2>
          <div className='uploadWarper'>
            <input type="file" onChange={handleFileChange} accept="audio/*" />
          </div>
          <div>
          { audioSrc &&
            <audio controls>
               <source src={audioSrc} ></source>
            </audio>}
          </div>
       {/*upload image section   */}
       <div>
       <h2>Change Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleFilePicture} />
        <GenericButton size='small' label='Upload Image' onClick={handleUploadPicture} className='' />
        {preview &&   <div>            <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </div>  }
          
       </div>
            <GenericButton size='small'  label='send preference' onClick={handleUpload} className=''/>

        </div>
        

       
        
    );
};

export default RingtoneEditButton;
