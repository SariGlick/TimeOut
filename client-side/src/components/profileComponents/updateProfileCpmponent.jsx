import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Tooltip, Button } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import { updateProfileApi, deleteProfileApi } from '../../services/profileService.js';
import { deleteProfile,updateProfile } from '../../redux/profile/profile.slice.js';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { formatProfileData, validateName, validateProfileDate, updateFormDataWithStatusBlockedSites } from '../../utils/profileUtil.js';
import {
    INPUT_LABELS,
    SELECT_OPTIONS,
    DIALOG_TITLES,
    TOAST_MESSAGES,
    BUTTON_LABELS,
    TOOLTIP_TEXTS
} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function UpdateProfileComponent({ profile}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
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

    const handleFieldChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === 'profileName') {
            const validName = validateName(value);
            setErrorMessages(validName);
        }
        if (name === "statusBlockedSites") {
            setFormData(prevState => updateFormDataWithStatusBlockedSites(prevState, value));
        } else if (name === "timeStart" || name === "timeEnd") {
            setFormData(prevState => ({
                ...prevState,
                timeProfile: {
                    ...prevState.timeProfile,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
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
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_SUCCESS} type="warning"/>);
                setTimeout(() => navigate(0), 3000);
            } catch (err) {
                enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_DELETED_ERROR} type="error"/>);
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
                    <Box mt={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box mt={3.2}>
                                    <Tooltip title={TOOLTIP_TEXTS.PROFILE_NAME}>
                                        <GenericInput
                                            label={INPUT_LABELS.PROFILE_NAME}
                                            name="profileName"
                                            value={formData.profileName}
                                            onChange={handleFieldChange}
                                            width='100%'
                                            error={!!errorMessages}
                                            helperText={<span>{errorMessages}</span>}
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} mt={2}>
                            <Grid item xs={12} sm={3}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.TIME_START}>
                                        <GenericInput
                                            label={INPUT_LABELS.TIME_START}
                                            name="timeStart"
                                            value={formData.timeProfile.timeStart}
                                            onChange={handleFieldChange}
                                            type="time"
                                            width='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.TIME_END}>
                                        <GenericInput
                                            label={INPUT_LABELS.TIME_END}
                                            name="timeEnd"
                                            value={formData.timeProfile.timeEnd}
                                            onChange={handleFieldChange}
                                            type="time"
                                            width='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.STATUS_BLOCKED_SITES}>
                                        <Select
                                            label={INPUT_LABELS.STATUS_BLOCKED_SITES}
                                            name="statusBlockedSites"
                                            value={formData.statusBlockedSites}
                                            onChange={handleFieldChange}
                                            options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
                                            widthOfSelect='100%'
                                        />
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                        <Button sx={{ color: ' rgb(103, 252, 210) ' }} onClick={handleClose}>
                            {BUTTON_LABELS.CANCEL}
                        </Button>
                    </Tooltip>
                    <Tooltip title={TOOLTIP_TEXTS.SAVE}>
                        <Button color="success" type="submit" onClick={handleSave}>
                            {BUTTON_LABELS.SAVE}
                        </Button>
                    </Tooltip>
                    <Tooltip title={TOOLTIP_TEXTS.DELETE_PROFILE}>
                        <Button color="error" onClick={handleDelete}>
                            {BUTTON_LABELS.DELETE_PROFILE}
                        </Button>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </div>
    );
}
