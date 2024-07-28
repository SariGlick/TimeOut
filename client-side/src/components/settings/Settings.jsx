import React, { useState } from 'react';
import axios from 'axios';
import GenericButton from '../../stories/Button/GenericButton';
import GenericInput from '../../stories/GenericInput/genericInput';
import CONSTANTS from '../../constants';

const Settings = ({ user }) => {
  const { LABELS } = CONSTANTS;
  const userId = user._id;
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleFilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validImageTypes.includes(file.type)) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Unsupported file type. Please upload an image (JPEG, PNG, GIF).');
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
    <>
      <div>
        <GenericInput size='medium' label={LABELS.ADD_IMAGE} type='file' onChange={handleFilePicture} />
        <GenericButton size='small' label={LABELS.UPLOAD_IMAGE} onClick={handleFormSubmit} className='UploadImageButton' />
      </div>
      {preview && (
        <div>
          <img src={preview} alt='Profile Preview'/>
        </div>
      )}
    </>
  );
};

export default Settings;
