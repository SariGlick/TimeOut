import React, { useState, useRef } from 'react';
import axios from 'axios';

const Localization = ({ user }) => {
    const [timeZone, setTimeZone] = useState('GMT±00:00');
    const [language, setLanguage] = useState('en');
    const preferenceId = user.preference._id;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const permissionRef = useRef(false);

    const handleSignUp = async () => {
        console.log('handleSignUp executed');
        const permission = window.confirm('Allow us to get your location and preferred language for a better experience?');
        permissionRef.current = true; 

        if (permission) {
            // Get time zone
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        setTimeZone(userTimeZone);

                        // Get language
                        const userLanguage = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || 'en';
                        setLanguage(userLanguage);

                        // Update preferences with user's data
                        updateUserPreferences(userTimeZone, userLanguage);
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
            // Permission denied, update with defaults
            updateUserPreferences(timeZone, language);
        }
    };

    const updateUserPreferences = async (updatedTimeZone, updatedLanguage) => {
        try {
            const formData = new FormData();
            formData.append('timeZone', updatedTimeZone);
            formData.append('language', updatedLanguage);

            const response = await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <div>
            <h1>Localization Settings</h1>
            <p>Time Zone: {timeZone}</p>
            <p>Preferred Language: {language}</p>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default Localization;
