import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import { addProfile } from '../../redux/profile/profile.slice.js';
import { createProfile } from '../../services/profileService.js';
import RadioButton from '../../stories/RadioButton/radio-Button.jsx';
import { SELECT_OPTIONS, INPUT_LABELS, DIALOG_TITLES, TOAST_MESSAGES, VALIDATE_MESSAGES, BUTTON_LABELS} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';

export default function AddProfile({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(getInitialData());
  const [errorText, setErrorText] = React.useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const userIdRedux = useSelector((state) => state.user.id);
  function getInitialData() {
    return {
      name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
      url: '',
      urlTimeLimit: 0,
      urlStatus: ''
    };
  }

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickOpen = useCallback(() => {
    setData(getInitialData());
    setOpen(true);
  }, []);

 

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
   
    setData(prevData => ({
      ...prevData,
      [name]: value
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

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const profileData = {
      userId:userId ,
      profileName: data.name,
      statusBlockedSites: data.status,
           timeProfile: {
        start: data.timeStart,
        end: data.timeEnd,
      }
    };
    
    try {
      await createProfile(profileData);
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_SUCCESS} type="success" />); 
      dispatch(addProfile(profileData));
      setTimeout(() => navigate(0), 2000);      
      handleClose();
    } catch (error) {
      console.error(TOAST_MESSAGES.PROFILE_CREATE_ERROR, error);
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_ERROR} type="error" />);
    }
  }, [data, dispatch, navigate, handleClose, enqueueSnackbar]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  //
  const handleFileUpload = async () => {
    if (!selectedFile) {
        return;
    }
    //
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('text',userIdRedux)
      console.log('useridddd',userIdRedux)
      // Replace with your API endpoint
      const response = await fetch('http://localhost:5000/profiles/upload', {
          method: 'POST',
          body: formData,
          
      });
      
      /////
      console.log('body',response.body)
      const responseText = await response.text(); // Get the response as text
      console.log('Response:', responseText);
  
      if (response.ok) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_CREATE_SUCCESS} type="success" />);
          console.log('File uploaded successfully!');
      } else {
          console.log('File upload failed:', response.statusText);
      }
      
  } catch (error) {
      console.log('An error occurred during upload!', error);
  }
   finally {
    console.log(true);
  }
  };
  return (
    <React.Fragment>
      <GenericButton label={DIALOG_TITLES.ADD_PROFILE} variant="outlined" className="profile-list-button" onClick={handleClickOpen} size="medium" />
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
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
            accept=".xlsx,.xls" 
            onChange={handleFileChange} 
            label="Upload Excel" 
            size="small" 
        />
      <span style={{ display: 'inline-block' }}>
  <Tooltip 
    title={!selectedFile ? TOAST_MESSAGES.FILE_NOT_SELECTED : ''} 
    disableHoverListener={!!selectedFile}
  >
    <span>
      <GenericButton 
        onChange={handleFileChange} 
        label="Add Profile" 
        onClick={handleFileUpload}
        disabled={!selectedFile}
        style={{ pointerEvents: !selectedFile ? 'none' : 'auto' }}
      />
    </span>
  </Tooltip>
</span>
        {/* <Tooltip title={!selectedFile ? TOAST_MESSAGES.FILE_NOT_SELECTED : ''}>
        <span>
         <GenericButton onChange={handleFileChange} 
            label="Add Profile" onClick={handleFileUpload}
            disabled={!selectedFile}
            />
            </span>
            </Tooltip> */}
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
            helperText={<span style={{ color: 'red' }}>{errorText}</span>}
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
          <Button color="error" onClick={handleClose}>
            {BUTTON_LABELS.CANCEL}
          </Button>
          {(!data.name || data.name.length < 2 || data.name.length > 50 || !data.status) ? (
            <Tooltip title={TOAST_MESSAGES.FORM_NOT_FILLED}>
              <span>
                <Button color="success" type="submit" disabled={!data.name || data.name.length < 2 || data.name.length > 50 || !data.status}>
                  {BUTTON_LABELS.ADDING}
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button color="success" type="submit">
              {BUTTON_LABELS.ADDING}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}