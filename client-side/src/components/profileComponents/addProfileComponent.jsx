import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material';

import RadioButton from '../../stories/RadioButton/radio-Button.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import { addProfile } from '../../redux/profile/profile.slice.js';
import { createProfile } from '../../services/profileService.js';
import {
  SELECT_OPTIONS,
  INPUT_LABELS,
  DIALOG_TITLES,
  TOAST_MESSAGES,
  VALIDATE_MESSAGES,
  BUTTON_LABELS,
  FILE_UPLOAD
} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';
import { handlePost } from '../../axios/middleware.js';

function AddProfile({ userId = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(getInitialData());
  const [errorText, setErrorText] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const isFormIncomplete = !data.name || data.name.length < 2 || data.name.length > 50 || !data.status;

  function getInitialData() {
    return {
      name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
    };
  }

  const toggleDialogOpen = () => {
    if (!isOpen) {
      setData(getInitialData());
    }
    setIsOpen(!isOpen);
  };

  const handleChange = useCallback((e) => {
    const { name, checked, value, type } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'name') {
      const validationMessage = validateName(value);
      setErrorText(validationMessage);
    }
  }, [data.status, enqueueSnackbar]);

  const validateName = (inputValue) => {
    if (inputValue.length < 2) {
      return VALIDATE_MESSAGES.PROFILE_NAME_SHORT;
    } else if (inputValue.length > 50) {
      return VALIDATE_MESSAGES.PROFILE_NAME_LONG;
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileData = {
      userId,
      profileName: data.name,
      statusBlockedSites: data.status,
      timeProfile: {
        start: data.timeStart,
        end: data.timeEnd,
      },
    };

    try {
      const ProfileNew = await createProfile(profileData);
      if (ProfileNew.status === 200) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_SUCCESS} type="success" />);
      }
      dispatch(addProfile(ProfileNew));
      setTimeout(() => navigate(0), 2000);
      // handleClose();
    } catch (error) {
      console.error(TOAST_MESSAGES.PROFILE_CREATE_ERROR, error);
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_ERROR} type="error" />);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', userId);
      const response = await handlePost('/profiles/upload', formData);
      if (response.status === 201) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_SUCCESS} type="success" />);
      }
      navigate('/profiles');
      // handleClose();
    } catch (error) {
      console.error('An error occurred during upload!', error);
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_ERROR} type="error" />);
    }
  };
  return (
    <>
      <GenericButton label={DIALOG_TITLES.ADD_PROFILE} variant="outlined" className="profile-list-button" onClick={toggleDialogOpen} size="medium" />
      <Dialog
        fullWidth={true}
        open={isOpen}
        onClose={toggleDialogOpen}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{DIALOG_TITLES.NEW_PROFILE}</DialogTitle>
        <DialogContent>
          <DialogContentText className='dialog-content-text'>
            {DIALOG_TITLES.CREATE_FORM_EXCEL}
          </DialogContentText>
          <GenericInput
            type="file"
            accept={FILE_UPLOAD.ACCEPTED_FILE_TYPES}
            onChange={handleFileChange}
            label={BUTTON_LABELS.UPLOAD_EXCEL}
            size="small"
            width='45%'
            className="add-profile-button"
          />
          <Tooltip
            title={!selectedFile ? TOAST_MESSAGES.FILE_NOT_SELECTED : ''}
            disableHoverListener={!!selectedFile}
          >
            <span>
              <GenericButton
                onChange={handleFileChange}
                label={BUTTON_LABELS.ADD_PROFILE}
                onClick={handleFileUpload}
                disabled={!selectedFile}
                className={`add-profile-button ${!selectedFile ? 'disabled' : 'enabled'}`}
              />
            </span>
          </Tooltip>
          <DialogContentText className='dialog-content-text'>
            {DIALOG_TITLES.CREATE_FORM}
          </DialogContentText>
          <GenericInput
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            size="small"
            width='60%'
            label={INPUT_LABELS.PROFILE_NAME}
            validation={validateName}
            error={!!errorText}
            helperText={<span className='helper-text'>{errorText}</span>}
          />
          <DialogContentText className='dialog-content-text'>{DIALOG_TITLES.PROFILE_TIME} </DialogContentText>
          <div className='div-time'>
            <GenericInput
              label={INPUT_LABELS.TIME_START}
              name="timeStart"
              type="time"
              value={data.timeStart}
              onChange={handleChange}
              width='100%'
            />
            <GenericInput
              label={INPUT_LABELS.TIME_END}
              name="timeEnd"
              type="time"
              value={data.timeEnd}
              onChange={handleChange}
              width='100%'
            />
          </div>
          <div>
            <DialogContentText className='dialog-content-text'>{DIALOG_TITLES.STATUS_LIST} </DialogContentText>
            <RadioButton
              name="status"
              options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
              selectedOption={data.status}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={toggleDialogOpen}>
            {BUTTON_LABELS.CANCEL}
          </Button>
          <span>
            <Button color="success" type="submit" disabled={isFormIncomplete}>
              {BUTTON_LABELS.ADDING}
            </Button>
          </span>
        </DialogActions>
      </Dialog>
    </>
  );
}
AddProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default AddProfile;