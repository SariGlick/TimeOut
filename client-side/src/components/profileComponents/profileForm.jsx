import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import Select from '../../stories/Select/Select.jsx';
import { INPUT_LABELS, TOOLTIP_TEXTS, SELECT_OPTIONS } from '../../constants/profileConstants.js';
import { handleFieldChange } from '../../utils/profileUtil.js';
import MapComponent from '../googleServices/googleMap.jsx';

function ProfileForm({ formData, setFormData }) {
    const handleSaveDataAddress = ({ address, markerPosition }) => {
        setFormData(prevData => {
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
                                width="100%"
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
                                width="100%"
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
                                width="100%"
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
                                widthOfSelect="100%"
                            />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box mt={1}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="googleMapsEnabled"
                                    checked={formData.googleMapsEnabled}
                                    onChange={(e) => handleFieldChange(e, setFormData)}
                                    className="custom-checkbox"
                                />
                            }
                            label="Google Map"
                        />
                        {formData.googleMapsEnabled && <MapComponent onSaveData={handleSaveDataAddress} />}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

ProfileForm.propTypes = {
    formData: PropTypes.shape({
        profileName: PropTypes.string,
        timeProfile: PropTypes.shape({
            timeStart: PropTypes.string,
            timeEnd: PropTypes.string,
        }),
        statusBlockedSites: PropTypes.string,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
    formData: {
        profileName: '',
        timeProfile: {
            timeStart: '00:00',
            timeEnd: '00:00',
        },
        statusBlockedSites: '',
    },
};

export default ProfileForm;
