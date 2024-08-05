import HourglassFullIcon from '@mui/icons-material/HourglassFull';


import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Tooltip, Button } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import {
    INPUT_LABELS,
    DIALOG_TITLES,
    BUTTON_LABELS,
    TOOLTIP_TEXTS
} from '../../constants/profileConstants.js';
import ProfileActivationTimer from './profileActivationComponent.jsx';
import '../../styles/profilePageStyle.scss';

export default function TimerActivationButton({profileName}) {

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(0);

    const [start, setStart] = useState('00:00');
    const [end, setEnd] = useState('00:00');


    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    function parseTimeStringToDate(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'timeStart') {
            setStart(value);
        } else if (name === 'timeEnd') {
            setEnd(value);
        }
    }

    const handleStart = () => {
        
        handleClose();

        const s = parseTimeStringToDate(start);
        const e = parseTimeStringToDate(end);
        const durationMinutes = (e - s) / 1000 / 60;
        if (durationMinutes >= 0) {
            setTime(durationMinutes);
        } else {
            setTime(durationMinutes * -1);
        }

    }

    return (
        <div>
            <Tooltip title={TOOLTIP_TEXTS.TIMER_ACTIVATION}>
                <GenericButton label={BUTTON_LABELS.TIMER_ACTIVATION} onClick={handleClickOpen} size="medium" className="profile-timer-button" />
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth={true} >

            {/* fullWidth={true}maxWidth="md"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }} */}
                <DialogTitle>{DIALOG_TITLES.TIMER_ACTIVATION}</DialogTitle>
                <DialogContent>
                    <Box mt={2}>
                        <Grid container spacing={3} mt={2}>
                            <Grid item xs={12} sm={3}>
                                <Box mt={1}>
                                    <Tooltip title={TOOLTIP_TEXTS.TIMER_ACTIVATION}>
                                        <GenericInput
                                            label={INPUT_LABELS.TIME_START}
                                            name="timeStart"
                                            value={start}
                                            onChange={handleChange}
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
                                            value={end}
                                            onChange={handleChange}
                                            type="time"
                                            width='100%'
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
                        <Button color="success" type="submit" onClick={handleStart}>
                            {BUTTON_LABELS.START}
                        </Button>
                    </Tooltip>
                </DialogActions>
            </Dialog>
            {time !== 0 &&
                <div className='timer'>
                    <ProfileActivationTimer profileActivationTime={time} profileName={profileName}/>
                </div>}
        </div>
    );
}
