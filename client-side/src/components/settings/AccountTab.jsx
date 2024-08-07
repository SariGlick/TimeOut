import React, { useEffect, useState } from 'react';
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import './account.scss'
const   AccountTab=({onUpdate})=> {
  const user = {
    "_id": "66b0bebd6069279e60d06cc4",
   "name": "shiraAs",
   "email": "shiraAs@gmail.com",
   "password": "$2b$10$MKAPg/ateCM7eGIZvs.sBu9y0EGT1fAIfxyN5Wt9/XYJakt.I9a1.",
   "googleId": "hghgh677",
   "profileImage": "snow.jpeg",
 };
 let imagesrc=''
  const url=process.env.REACT_APP_BASE_URL;
  if(user.profileImage)
    imagesrc=`${url}/uploads/${user.profileImage}`
  const [imageFile,setImageFile]= useState(null);
  const [preview, setPreview] = useState(imagesrc);

  useEffect(()=>{
    onUpdate({
      profileImage:imageFile,
      name:'',
      password:'',
      email:''
    })
  },[ imageFile])
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
    formData.append('profileImage', imageFile);
    
  };
  return (
   <div className='account-warper'>
       <div>
       <h2  className='font'>Change Profile Picture</h2>
        <GenericInput type="file" accept="image/*" onChange={handleFilePicture} label='upload image' size='small'/>
        {preview  &&   <div className='profile-picture-container'>            <img src={preview} alt="Profile Preview" className="profile-picture" />
        </div>  }
       </div>
    </div>
  )
}
export default AccountTab

