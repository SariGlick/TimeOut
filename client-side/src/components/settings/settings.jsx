import React, { useState } from 'react';
import axios from 'axios';
import GenericButton from '../../stories/Button/GenericButton'
import GenericInput from '../../stories/GenericInput/genericInput';

const Settings = ({ user }) => {
  const userId = user._id;
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

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    try {
      await axios.put(`${baseUrl}/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('error updating image', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GenericInput size='medium' label='Add Image' type='file' onChange={handleFilePicture} />
        <GenericButton size='small' label='Upload Image' onClick={handleFormSubmit} className='UploadImageButton' />
      </div>
      {preview && (
        <div>
          <img src={preview} alt='Profile Preview' style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
};

export default Settings;
