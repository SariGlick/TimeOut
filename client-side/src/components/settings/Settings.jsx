import React, { useState } from 'react';
import GenericButton from '../../stories/Button/GenericButton';
import GenericInput from '../../stories/GenericInput/genericInput';
import CONSTANTS from '../../constants';
import { uploadFile } from './uploadprofileimageutil';

const Settings = ({ user }) => {
    const { LABELS, MESSAGES } = CONSTANTS;
    const userId = user._id;
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [message, setMessage] = useState('');
    const [toastType, setToastType] = useState('info');
    const [openToast, setOpenToast] = useState(false);

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
                setToastType('error');
                setMessage(MESSAGES.UNSUCCESS_UPLOAD_FILE_TYPE);
                setOpenToast(true);
            }
        }
    };

    const handleFormSubmit = async () => {
        const formData = new FormData();
        formData.append('profileImage', imageFile);
        try {
            const response = await uploadFile(baseUrl, formData, 'put');
            setMessage(MESSAGES.SUCCESS_UPDATED_SETTINGS);
        } catch (error) {
            setMessage(MESSAGES.UNSUCCESS_UPLOAD_FILE);
        }
    };
    const handleCloseToast = () => {
        setOpenToast(false);
    };

    return (
        <>
            <div>
                <GenericInput size='medium' label={LABELS.ADD_IMAGE} type='file' onChange={handleFilePicture} />
                <GenericButton size='small' label={LABELS.UPLOAD_IMAGE} onClick={handleFormSubmit} className='UploadImageButton' />
            </div>
            {preview && (
                <div>
                    <img src={preview} alt='Profile Preview' />
                </div>
            )}
        </>
    );
};

export default Settings;
