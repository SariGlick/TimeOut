import React, { useState } from 'react';
import axios from 'axios';
import GenericButton from '../../stories/Button/GenericButton'

const ProfileImageEditButton = ({userId}) => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleFilePicture = (e) => {
    if (e) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleUploadPicture = async () => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    try {
      const response = await axios.put(`${baseUrl}/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('image', response.data);
    } catch (error) {
        console.error('error updating image', error);
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
