import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Box,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import RadioButton from '../../stories/RadioButton/radio-Button.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import { addProfile } from '../../redux/profile/profile.slice.js';
import { createProfile } from '../../services/profileService.js';
import MapComponent from '../googleServices/googleMap.jsx'
import {
  SELECT_OPTIONS,
  INPUT_LABELS,
  DIALOG_TITLES,
  TOAST_MESSAGES,
  VALIDATE_MESSAGES,
  BUTTON_LABELS
} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function AddProfile({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(getInitialData());
  const [errorText, setErrorText] = React.useState('');

  function getInitialData() {
    return {
      name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
      googleMapsEnabled: false,
      googleMapsLocation: { address: '', lat: 0, lng: 0 },
      googleCalendarEnabled: false,
      googleCalendarId: '',
      googleDriveEnabled: false,
      googleDriveFolderId: ''
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

  const handleSaveDataAddress = ({ address, markerPosition }) => {
    setData(prevData => {
      const updatedData = {
        ...prevData,
        googleMapsLocation: {
          address: address,
          lat: markerPosition.lat,
          lng: markerPosition.lng
        }
      };
      return updatedData;
    });
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const booleanize = (value) => {
      return value === true || value === 'true';
    };
    debugger
    const profileData = {
      userId: userId,
      profileName: data.name,
      statusBlockedSites: data.status,
      timeProfile: {
        start: data.timeStart,
        end: data.timeEnd,
      },
      googleMapsLocation: {
        enabled: booleanize(data.googleMapsEnabled),
        location: {
          address: data.googleMapsLocation.address,
          lat: data.googleMapsLocation.lat,
          lng: data.googleMapsLocation.lng
        }
      },
      googleCalendarEvents: {
        enabled: booleanize(data.googleCalendarEnabled),
        calendarId: data.googleCalendarId
      },
      googleDriveFiles: {
        enabled: booleanize(data.googleDriveEnabled),
        folderId: data.googleDriveFolderId
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
  }, [data, dispatch, navigate, handleClose, enqueueSnackbar, userId]);

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
          <Box className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  name="googleMapsEnabled"
                  checked={data.googleMapsEnabled}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
              }
              label="Google Map"
            />
            {data.googleMapsEnabled && <MapComponent onSaveData={handleSaveDataAddress} />}
            <FormControlLabel
              control={
                <Checkbox
                  name="googleCalendarEnabled"
                  checked={data.googleCalendarEnabled}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
              }
              label="Google Calendar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="googleDriveEnabled"
                  checked={data.googleDriveEnabled}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
              }
              label="Google Drive"
            />
          </Box>
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