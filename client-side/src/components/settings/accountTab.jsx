import React, { useState } from 'react';
import GenericButton  from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import './account.scss'
const   AccountTab=()=> {
  const url=process.env.REACT_APP_BASE_URL;
  const [imageFile,setImageFile]= useState(null);
  const [preview, setPreview] = useState(null);
  const handleFilePicture = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
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
        {
        preview && 
          <div className='profile-picture-container'>
          <img src={preview} alt="Profile Preview" className="profile-picture" />
         </div> 
        }
       </div>
    </div>
  )
}
export default AccountTab