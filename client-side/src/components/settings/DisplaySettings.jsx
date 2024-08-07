import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from '../../stories/Select/Select.jsx';
import CONSTANTS from './constantSetting.js';
import './DisplaySettings.scss';
import { useTheme } from '../../themes/ThemeProvider';

const DisplaySettings = ({ currentUser, onUpdate }) => {
  const { themes: initialThemes, notoficationsLocation: initalNotoficationsLocation } = currentUser.preference;
  const { currentTheme, toggleTheme } = useTheme();
  const { NOTIFICATIONS_LOCATION, THEMES, LABELS, TITLES } = CONSTANTS;
  const { t } = useTranslation();
  const [themes, setThemes] = useState(initialThemes);
  const [notoficationsLocation, setNotoficationsLocation] = useState(initalNotoficationsLocation);

  useEffect(() => {
    onUpdate({
      themes,
      notoficationsLocation
    });
  }, [themes,notoficationsLocation, onUpdate]);

  const handleThemeChange = (selectedTheme) => {
    setThemes(selectedTheme);
    toggleTheme(selectedTheme);
  };
  const handleNotoficationsLocation = (selectedNotoficationsLocation) => {
    setNotoficationsLocation(selectedNotoficationsLocation);
  
  };

  return (
    <div className="display-settings">
      <div className="select-container">
        <Select
          className="select-theme"
          options={Object.keys(THEMES).map(key => ({
            text: t(key.toLowerCase()),
            value: THEMES[key]
          }))}
          title={t(TITLES.SELECT_THEME)}
          onChange={handleThemeChange}
          value={themes}
          size="medium"
          widthOfSelect="210px"
        />
      </div>
      <div className="select-container">
        <Select
          className="select-notifications-location"
          options={NOTIFICATIONS_LOCATION.map(({ value, label }) => ({
            text: t(label),
            value: value
          }))}
          value={notoficationsLocation}
          onChange={handleNotoficationsLocation}
          title={t(LABELS.SELECT_DATE_FORMAT)}
          size="large"
          widthOfSelect="210px"
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
