import React, { useState,useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

import Select from '../../stories/Select/Select.jsx';
import { selectAuth } from '../../redux/auth/auth.selector.js';

import CONSTANTS from './constantSetting.js';
import './Preferences.scss';

const createTimeZones = () => {
  return moment.tz.names().map(timezone => ({
    value: timezone,
    text: timezone,
  }));
};

const Preferences = ({ onUpdate}) => {
  const { user } = useSelector(selectAuth);
  const { t: translate, i18n: localization } = useTranslation();
  const {  LABELS, LANGUAGE,DATE_FORMATS } = CONSTANTS;
  const { timeZone: initialTimeZone="UTC", dateFormat: initialDateFormat="YYYY-MM-DD" } = user.preference;
  const [language, setLanguage] = useState(localization.resolvedLanguage);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [dateFormat, setDateFormat] = useState(initialDateFormat);
  const languageOptions = Object.keys(LANGUAGE).map(key => ({
    value: key,
    text: LANGUAGE[key]['text'],
    iconSrc: LANGUAGE[key]['icon']
  }));

  const timeZoneOptions = createTimeZones().map(tz => ({
    text: tz.text,
    value: tz.value
  }));

  const dateFormatOptions = DATE_FORMATS.map(({ value, label }) => ({
    text: translate(label),
    value: value
  }));

  const prevValues = useRef({
    language,
    timeZone,
    dateFormat
  });

  useEffect(() => {
    const changes = {};
    
    if (prevValues.current.language !== language) {
      changes.language = language;
    }
    if (prevValues.current.timeZone !== timeZone) {
      changes.timeZone = timeZone;
    }
    if (prevValues.current.dateFormat !== dateFormat) {
      changes.dateFormat = dateFormat;
    }
    
    if (Object.keys(changes).length > 0) {
      onUpdate(changes);
      prevValues.current = {
        language,
        timeZone,
        dateFormat
      };
    }
  }, [language, timeZone, dateFormat, onUpdate]);

  const handleLanguageChange = (value) => {
    localization.changeLanguage(value);
    setLanguage(value);
  };

  const handleChangeTimeZone = (selectedTimeZone) => {
    setTimeZone(selectedTimeZone);
  };

  return (
    <div className="preferences-container">
      <Select
        title={translate(LABELS.SELECT_LANGUAGES)}
        options={languageOptions}
        className='select-class'
        size='medium'
        widthOfSelect='210px'
        value={language}
        onChange={handleLanguageChange}
      />
      <Select
        className='select-time-zone'
        options={timeZoneOptions}
        title={translate(LABELS.SELECT_TIME_ZONE)}
        onChange={handleChangeTimeZone}
        value={timeZone}
        size='medium'
        widthOfSelect='210px'
      />
      <Select
        className='select-date-format'
        options={dateFormatOptions}
        value={dateFormat}
        onChange={setDateFormat}
        title={translate(LABELS.SELECT_DATE_FORMAT)}
        size='large'
        widthOfSelect='210px'
      />
    </div>
  );
};
Preferences.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};
export default Preferences;
