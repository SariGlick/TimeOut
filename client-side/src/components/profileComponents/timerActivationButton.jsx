import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button } from '@mui/material';
import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import GenericButton from '../../stories/Button/GenericButton.jsx';
import {
    INPUT_LABELS,
    DIALOG_TITLES,
    BUTTON_LABELS,
} from '../../constants/profileConstants.js';
import ProfileActivationTimer from './profileActivationTimer.jsx';
import '../../styles/profilePageStyle.scss';

 function TimerActivationButton({ profileName='' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [start, setStart] = useState('00:00');
    const [end, setEnd] = useState('00:00');
    const [timers, setTimers] = useState([]);

    const handleClickOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
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
        const duration = Math.abs(durationMinutes);

        const existingTimerIndex = timers.findIndex(timer => timer.profileName === profileName);
        
        if (existingTimerIndex >= 0) {
            const updatedTimers = [...timers];
            updatedTimers[existingTimerIndex] = { profileName, duration };
            setTimers(updatedTimers);
        } else {
            setTimers([...timers, { profileName, duration }]);
        }
    }

    return (
        <div>
            <GenericButton label={BUTTON_LABELS.TIMER_ACTIVATION} onClick={handleClickOpen} size="medium" className="profile-timer-button" />
            <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
                <DialogTitle>{DIALOG_TITLES.TIMER_ACTIVATION}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} mt={2}>
                        <Grid item xs={12} sm={3}>
                            <GenericInput
                                label={INPUT_LABELS.TIME_START}
                                name="timeStart"
                                value={start}
                                onChange={handleChange}
                                type="time"
                                width='100%'
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <GenericInput
                                label={INPUT_LABELS.TIME_END}
                                name="timeEnd"
                                value={end}
                                onChange={handleChange}
                                type="time"
                                width='100%'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'rgb(103, 252, 210)' }} onClick={handleClose}>
                        {BUTTON_LABELS.CANCEL}
                    </Button>
                    <Button color="success" type="submit" onClick={handleStart}>
                        {BUTTON_LABELS.START}
                    </Button>
                </DialogActions>
            </Dialog>
            {timers.length > 0 &&
                <div className='timer'>
                    {timers.map((timer, index) => (
                        <ProfileActivationTimer
                            key={index}
                            profileActivationTime={timer.duration}
                            profileName={timer.profileName}
                        />
                    ))}
                </div>
            }
        </div>
    );
}
TimerActivationButton.propTypes = {
    profileName: PropTypes.string.isRequired
};
export default  TimerActivationButton