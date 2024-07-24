import React, { useState, useRef } from 'react';
import axios from 'axios';
import { LANGUAGE, LABELS, MESSAGES } from '../constants/index.jsx';
import GenericButton from '../stories/Button/GenericButton.jsx';

function getGMTOffset() {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? '+' : '-';
    return `GMT${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const SignUp = ({ user }) => {
    const [timeZone, setTimeZone] = useState('GMT±00:00');
    const [language, setLanguage] = useState('en');
    const preferenceId = user.preference._id;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleSignUp = async () => {
        const permission = window.confirm(MESSAGES.CONFIRM_LOCATION);
        if (permission) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userTimeZone = getGMTOffset();
                        setTimeZone(userTimeZone);

                        // Get language
                        const userLanguage = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || 'en';
                        const languageCode = userLanguage.split('-')[0]; // Extract just the language code
                        const validatedLanguage = LANGUAGE[languageCode] ? languageCode : 'en'; // Check if language exists
                        setLanguage(validatedLanguage);

                        // Update preferences with user's data
                        updateUserPreferences(userTimeZone, validatedLanguage);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Since geolocation failed, update with defaults
                        updateUserPreferences(timeZone, language);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                // Update with defaults if geolocation not supported
                updateUserPreferences(timeZone, language);
            }
        } else {
            updateUserPreferences(timeZone, language);
        }

    };

    const updateUserPreferences = async (updatedTimeZone, updatedLanguage) => {
        try {
            const formData = new FormData();
            formData.append('timeZone', updatedTimeZone);
            formData.append('language', updatedLanguage);

            await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <GenericButton
            className='signUp'
            label={LABELS.SIGN_UP}
            size='medium'
            onClick={handleSignUp}
        />
    );
};

export default SignUp;
