import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
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

const initialFormData = {
    userId: '',
    profileName: '',
    timeProfile: {
        timeStart: new Date().toISOString().substr(11, 5),
        timeEnd: new Date().toISOString().substr(11, 5),
    },
    statusBlockedSites: '',
    websites: [],
};

export default function UpdateProfileComponent({ profile=null }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (profile) {
            setFormData(formatProfileData(profile));
        }
    }, [profile]);

    const toggleDialogOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleSave = async () => {
        const nameValidation = validateName(formData.profileName);
        if (nameValidation === -1) {
            enqueueSnackbar(<ToastMessage message={VALIDATE_MESSAGES.PROFILE_NAME_SHORT} type="error" />);
            return;
        }
        if (nameValidation === 0) {
            enqueueSnackbar(<ToastMessage message={VALIDATE_MESSAGES.PROFILE_NAME_LONG} type="error" />);
            return;
        }
        try {
            await updateProfileApi(profile._id, formData);
            dispatch(updateProfile(formData));
            dispatch(setSelectProfile(formData));
            toggleDialogOpen();
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
                <GenericButton label={BUTTON_LABELS.EDIT_PROFILE} onClick={toggleDialogOpen} size="medium" className="profile-list-button" />
            </Tooltip>
            <Dialog open={isOpen} onClose={toggleDialogOpen} fullWidth maxWidth="md">
                <DialogTitle>{DIALOG_TITLES.EDIT_PROFILE}</DialogTitle>
                <DialogContent>
                    <ProfileForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <ProfileActions handleSave={handleSave} handleClose={toggleDialogOpen} handleDelete={handleDelete} />
                </DialogActions>
            </Dialog>
        </div>
    );
}

UpdateProfileComponent.propTypes = {
    profile: PropTypes.object
};

