import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip} from '@mui/material';
import ProfileForm from './profileForm';
import ProfileActions from './profileActions';
import { updateProfileApi, deleteProfileApi } from '../../services/profileService.js';
import { deleteProfile, updateProfile } from '../../redux/profile/profile.slice.js';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { formatProfileData, validateProfileDate } from '../../utils/profileUtil.js';
import { DIALOG_TITLES, TOAST_MESSAGES, TOOLTIP_TEXTS, BUTTON_LABELS } from '../../constants/profileConstants.js';
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
        websites: []
    });

    useEffect(() => {
        if (profile) {
            setFormData(formatProfileData(profile));
        }
    }, [profile]);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSave = useCallback(async () => {
        const isValid = validateProfileDate(formData);
        if (!isValid) {
            return;
        }
        try {
            const updatedProfile = {
                userId: formData.userId,
                profileName: formData.profileName,
                statusBlockedSites: formData.statusBlockedSites,
                timeProfile: {
                    start: formData.timeProfile.timeStart,
                    end: formData.timeProfile.timeEnd
                },
                listWebsites: formData.websites
            };
            await updateProfileApi(profile._id, updatedProfile);
            dispatch(updateProfile(updatedProfile));
            handleClose();
            enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_UPDATED_SUCCESS} type="success" />);
            setTimeout(() => navigate(0), 3000);
        } catch (error) {
            enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_UPDATED_ERROR} type="error" />);
        }
    }, [formData, profile, handleClose]);

    const handleDelete = useCallback(async () => {
        if (profile && profile._id) {
            try {
                await deleteProfileApi(profile._id);
                dispatch(deleteProfile(profile._id));
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_SUCCESS} type="warning" />);
                setTimeout(() => navigate(0), 3000);
            } catch (err) {
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_ERROR} type="error" />);
            }
        }
    }, [dispatch, profile]);

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
