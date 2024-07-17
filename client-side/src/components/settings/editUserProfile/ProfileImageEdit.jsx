import React, { useState } from 'react';
import axios from 'axios';
import GenericButton from '../../../stories/Button/GenericButton';

const ProfileImageEditButton = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const userId = '6694d2295d41f7809588274c';
  const [imageFile,setImageFile]= useState(null);
  const url=process.env.REACT_APP_BASE_URL;

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
    try {
      const response = await axios.put(`http://localhost:5000/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      if(error.response)
      alert('Failed to update profile image.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>Change Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleFilePicture} />
        <GenericButton size='small' label='Upload Image' onClick={handleUploadPicture} className='' />
      </div>
      {preview && (
        <div>
          <img src={preview} alt="Profile Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageEditButton;
