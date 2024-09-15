import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Select from '../../stories/Select/Select.jsx';
import CONSTANTS from './constantSetting.js';
import './DisplaySettings.scss';

const DisplaySettings = ({ currentUser, onUpdate }) => {
  const { themes: userThemes, notificationsLocation: userNotificationsLocation } = currentUser.preference;
  const { currentTheme, toggleTheme } = useTheme();
  const { NOTIFICATIONS_LOCATION, THEMES, LABELS, TITLES } = CONSTANTS;
  const { t } = useTranslation();
  const [themes, setThemes] = useState(userThemes);
  const [notificationsLocation, setNotificationsLocation] = useState(userNotificationsLocation);

  useEffect(() => {
    onUpdate({
      themes,
      notificationsLocation
    });
  }, [themes, notificationsLocation, onUpdate]);

  const handleThemeChange = (selectedTheme) => {
    setThemes(selectedTheme);
    toggleTheme(selectedTheme);
  };

  const handleNotificationsLocationChange = (selectedNotificationsLocation) => {
    setNotificationsLocation(selectedNotificationsLocation);
  };

  // Define options for themes and notifications location
  const themeOptions = Object.keys(THEMES).map(key => ({
    text: t(key.toLowerCase()),
    value: THEMES[key]
  }));

  const notificationLocationOptions = NOTIFICATIONS_LOCATION.map(({ value, label }) => ({
    text: t(label),
    value: value
  }));

  return (
    <div className="display-settings">
      <div className="select-container">
        <Select
          className="select-theme"
          options={themeOptions}
          title={t(TITLES.SELECT_THEME)}
          onChange={handleThemeChange}
          value={themes}
          size="medium"
          widthOfSelect="100%"
        />
      </div>
      <div className="select-container">
        <Select
          className="select-notifications-location"
          options={notificationLocationOptions}
          value={notificationsLocation}
          onChange={handleNotificationsLocationChange}
          title={t(LABELS.SELECT_DATE_FORMAT)}
          size="large"
          widthOfSelect="100%"
        />
      </div>
    </div>
  );
};

DisplaySettings.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default DisplaySettings;
