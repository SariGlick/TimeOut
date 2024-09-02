import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip
} from '@mui/material';
import ProfileForm from './profileForm.jsx';
import ProfileActions from './profileActions.jsx';
import { updateProfileApi, deleteProfileApi } from '../../services/profileService.js';
import { deleteProfile, updateProfile, setSelectProfile } from '../../redux/profile/profile.slice.js';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { formatProfileData, validateName } from '../../utils/profileUtil.js';
import {
    DIALOG_TITLES,
    TOAST_MESSAGES,
    TOOLTIP_TEXTS,
    BUTTON_LABELS,
    VALIDATE_MESSAGES
} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function UpdateProfileComponent({ profile }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        profileName: '',
        timeProfile: {
            timeStart: new Date().toISOString().substr(11, 5),
            timeEnd: new Date().toISOString().substr(11, 5),
        },
        statusBlockedSites: '',
        websites: [],
        googleMapsEnabled: false,
        googleMapsLocation: { address: '', lat: 0, lng: 0 },
        googleCalendarEnabled: false,
        googleCalendarId: '',
        googleDriveEnabled: false,
        googleDriveFolderId: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData(formatProfileData(profile));
        }
    }, [profile]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (validateName(formData.profileName) === -1) {
            enqueueSnackbar(<ToastMessage message={VALIDATE_MESSAGES.PROFILE_NAME_SHORT} type="error" />);
            return;
        }
        if (validateName(formData.profileName) === 0) {
            enqueueSnackbar(<ToastMessage message={VALIDATE_MESSAGES.PROFILE_NAME_LONG} type="error" />);
            return;
        }
        const booleanize = (value) => {
            return value === true || value === 'true';
        };
        try {
            const updatedProfile = {
                userId: formData.userId,
                profileName: formData.profileName,
                statusBlockedSites: formData.statusBlockedSites,
                timeProfile: {
                    start: formData.timeProfile.timeStart,
                    end: formData.timeProfile.timeEnd
                },
                listWebsites: formData.websites,
                googleMapsLocation: {
                    enabled: booleanize(formData.googleMapsEnabled),
                    location: {
                        address: formData.googleMapsLocation.address,
                        lat: formData.googleMapsLocation.lat,
                        lng: formData.googleMapsLocation.lng
                    }
                },
                googleCalendarEvents: {
                    enabled: booleanize(formData.googleCalendarEnabled),
                    calendarId: formData.googleCalendarId
                },
                googleDriveFiles: {
                    enabled: booleanize(formData.googleDriveEnabled),
                    folderId: formData.googleDriveFolderId
                }
            };
            await updateProfileApi(profile._id, updatedProfile);
            dispatch(updateProfile(updatedProfile));
            dispatch(setSelectProfile(updatedProfile));
            handleClose();
            enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_UPDATED_SUCCESS} type="success" />);
            setTimeout(() => navigate(0), 3000);
        } catch (error) {
            enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_UPDATED_ERROR} type="error" />);
        }
    };

    const handleDelete = async () => {
        if (profile && profile._id) {
            try {
                await deleteProfileApi(profile._id);
                dispatch(deleteProfile(profile._id));
                dispatch(setSelectProfile(null));
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_SUCCESS} type="warning" />);
                setTimeout(() => navigate(0), 3000);
            } catch (err) {
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_ERROR} type="error" />);
            }
        }
    };

    return (
        <div>
            <Tooltip title={TOOLTIP_TEXTS.EDIT_PROFILE}>
                <GenericButton label={BUTTON_LABELS.EDIT_PROFILE} onClick={handleClickOpen} size="medium" className="profile-list-button" />
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{DIALOG_TITLES.EDIT_PROFILE}</DialogTitle>
                <DialogContent>
                    <ProfileForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <ProfileActions handleSave={handleSave} handleClose={handleClose} handleDelete={handleDelete} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
