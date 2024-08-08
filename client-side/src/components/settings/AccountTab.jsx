import React, { useEffect, useState } from 'react';
import { selectAuth } from '../../redux/auth/auth.selector';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import './account.scss'
import CONSTANTS from './constantSetting.js'
import { Label } from '@mui/icons-material';
const   AccountTab=({onUpdate})=> {
  
  const { user } = useSelector(selectAuth); 
  const {LABELS} =CONSTANTS
  const {t} =useTranslation();
  const url=process.env.REACT_APP_BASE_URL;
  let imagesrc=''
  if(user)
    imagesrc=`${url}/uploads/${user.profileImage}`
  const [imageFile,setImageFile]= useState(null);
  const [preview, setPreview] = useState(imagesrc);

  useEffect(()=>{
    onUpdate({
      profileImage:imageFile,
      
    })
  },[ imageFile])
  const handleFilePicture = (e) => {
    if (e) {
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


  return (
   <div className='account-warper'>
       <div>
        <GenericInput type="file" accept="image/*" onChange={handleFilePicture} label={t(LABELS.UPLOAD_IMAGE)} size='small'/>
        {preview  &&   <div className='profile-picture-container'>            <img src={preview} alt="Profile Preview" className="profile-picture" />
        </div>  }
       </div>
    </div>
  )
}
export default AccountTab

