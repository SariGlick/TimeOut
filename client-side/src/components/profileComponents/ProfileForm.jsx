import React from 'react';
import { Grid, Box, Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import MapComponent from '../googleServices/googleMap.jsx';
import { handleFieldChange } from '../../utils/profileUtil.js';
import {
    INPUT_LABELS,
    TOOLTIP_TEXTS,
    SELECT_OPTIONS
} from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function ProfileForm({ formData, setFormData }) {

    const handleSaveDataAddress = ({ address, markerPosition }) => {
        debugger
        setFormData(prevData => ({
            ...prevData,
            googleMapsLocation: {
                address: address,
                lat: markerPosition.lat,
                lng: markerPosition.lng
            }
        }));
    };

    return (
        <Box mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box mt={3.2}>
                        <Tooltip title={TOOLTIP_TEXTS.PROFILE_NAME}>
                            <GenericInput
                                label={INPUT_LABELS.PROFILE_NAME}
                                name="profileName"
                                value={formData.profileName}
                                onChange={(e) => handleFieldChange(e, setFormData)}
                                width='100%'
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
                                onChange={(e) => handleFieldChange(e, setFormData)}
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
                                onChange={(e) => handleFieldChange(e, setFormData)}
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
                                onChange={(e) => handleFieldChange(e, setFormData)}
                                options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
                                widthOfSelect='100%'
                            />
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={4}>
                    <Box mt={1}>
                        <Tooltip title={TOOLTIP_TEXTS.GOOGLE_MAP}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="googleMapsEnabled"
                                        checked={formData.googleMapsEnabled}
                                        onChange={(e) => handleFieldChange(e, setFormData)}
                                        className="custom-checkbox"
                                    />
                                }
                                label={INPUT_LABELS.GOOGLE_MAP}
                            />
                        </Tooltip>
                        {formData.googleMapsEnabled && <MapComponent onSaveData={handleSaveDataAddress}/>}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box mt={1}>
                        <Tooltip title={TOOLTIP_TEXTS.GOOGLE_CALENDAR}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="googleCalendarEnabled"
                                        checked={formData.googleCalendarEnabled}
                                        onChange={(e) => handleFieldChange(e, setFormData)}
                                        className="custom-checkbox"
                                    />
                                }
                                label={INPUT_LABELS.GOOGLE_CALENDAR}
                            />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box mt={1}>
                        <Tooltip title={TOOLTIP_TEXTS.GOOGLE_DRIVE}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="googleDriveEnabled"
                                        checked={formData.googleDriveEnabled}
                                        onChange={(e) => handleFieldChange(e, setFormData)}
                                        className="custom-checkbox"
                                    />
                                }
                                label={INPUT_LABELS.GOOGLE_DRIVE}
                            />
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
