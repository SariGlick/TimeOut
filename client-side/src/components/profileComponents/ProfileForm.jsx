// import React from 'react';
// import { Grid, Box, Tooltip } from '@mui/material';
// import GenericInput from '../../stories/GenericInput/genericInput.jsx';
// import Select from '../../stories/Select/Select.jsx';
// import { INPUT_LABELS, TOOLTIP_TEXTS, SELECT_OPTIONS } from '../../constants/profileConstants.js';
// import { handleFieldChange } from '../../utils/profileUtil.js';

// export default function ProfileForm({ formData, setFormData }) {
//     return (
//         <Box mt={2}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     <Box mt={3.2}>
//                         <Tooltip title={TOOLTIP_TEXTS.PROFILE_NAME}>
//                             <GenericInput
//                                 label={INPUT_LABELS.PROFILE_NAME}
//                                 name="profileName"
//                                 value={formData.profileName}
//                                 onChange={(e) => handleFieldChange(e, setFormData)}
//                                 width='100%'
//                             />
//                         </Tooltip>
//                     </Box>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={3} mt={2}>
//                 <Grid item xs={12} sm={3}>
//                     <Box mt={1}>
//                         <Tooltip title={TOOLTIP_TEXTS.TIME_START}>
//                             <GenericInput
//                                 label={INPUT_LABELS.TIME_START}
//                                 name="timeStart"
//                                 value={formData.timeProfile.timeStart}
//                                 onChange={(e) => handleFieldChange(e, setFormData)}
//                                 type="time"
//                                 width='100%'
//                             />
//                         </Tooltip>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <Box mt={1}>
//                         <Tooltip title={TOOLTIP_TEXTS.TIME_END}>
//                             <GenericInput
//                                 label={INPUT_LABELS.TIME_END}
//                                 name="timeEnd"
//                                 value={formData.timeProfile.timeEnd}
//                                 onChange={(e) => handleFieldChange(e, setFormData)}
//                                 type="time"
//                                 width='100%'
//                             />
//                         </Tooltip>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={5}>
//                     <Box mt={1}>
//                         <Tooltip title={TOOLTIP_TEXTS.STATUS_BLOCKED_SITES}>
//                             <Select
//                                 label={INPUT_LABELS.STATUS_BLOCKED_SITES}
//                                 name="statusBlockedSites"
//                                 value={formData.statusBlockedSites}
//                                 onChange={(e) => handleFieldChange(e, setFormData)}
//                                 options={SELECT_OPTIONS.STATUS_BLOCKED_SITES}
//                                 widthOfSelect='100%'
//                             />
//                         </Tooltip>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }


import React from 'react';
import { Grid, Box, Tooltip, FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import { INPUT_LABELS, TOOLTIP_TEXTS, SELECT_OPTIONS } from '../../constants/profileConstants.js';
import { handleFieldChange } from '../../utils/profileUtil.js';

export default function ProfileForm({ formData, setFormData }) {
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
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="statusBlockedSites-label">{INPUT_LABELS.STATUS_BLOCKED_SITES}</InputLabel>
                            <Tooltip title={TOOLTIP_TEXTS.STATUS_BLOCKED_SITES}>
                                <MuiSelect
                                    labelId="statusBlockedSites-label"
                                    id="statusBlockedSites"
                                    value={formData.statusBlockedSites}
                                    onChange={(e) => handleFieldChange(e, setFormData)}
                                    label={INPUT_LABELS.STATUS_BLOCKED_SITES}
                                >
                                    {SELECT_OPTIONS.STATUS_BLOCKED_SITES.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MuiSelect>
                            </Tooltip>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
