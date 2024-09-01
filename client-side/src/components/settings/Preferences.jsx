import React, { useState, useEffect } from 'react';
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

const Preferences = ({ onUpdate }) => {
  const { user } = useSelector(selectAuth);
  const { t: translate, i18n: localization } = useTranslation();
  const { LABELS, LANGUAGE, DATE_FORMATS } = CONSTANTS;
  const { timeZone: initialTimeZone = "UTC", dateFormat: initialDateFormat = DATE_FORMATS[0].value } = user.preference;
  const [language, setLanguage] = useState(localization.resolvedLanguage);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [dateFormat, setDateFormat] = useState(initialDateFormat);
  const languageOptions = Object.keys(LANGUAGE).map(key => ({
    value: key,
    text: LANGUAGE[key]['text'],
    iconSrc: LANGUAGE[key]['icon']
  }));

  const timeZoneOptions = createTimeZones();

  const dateFormatOptions = DATE_FORMATS.map(({ value, label }) => ({
    text: translate(label),
    value: value
  }));

  const [prevValues, setPrevValues] = useState({
    language,
    timeZone,
    dateFormat
  });

  useEffect(() => {
    if (prevValues.language !== language) {
      onUpdate({ language });
      setPrevValues(prev => ({ ...prev, language }));
    }
  }, [language]);

  useEffect(() => {
    if (prevValues.timeZone !== timeZone) {
      onUpdate({ timeZone });
      setPrevValues(prev => ({ ...prev, timeZone }));
    }
  }, [timeZone]);

  useEffect(() => {
    if (prevValues.dateFormat !== dateFormat) {
      onUpdate({ dateFormat });
      setPrevValues(prev => ({ ...prev, dateFormat }));
    }
  }, [dateFormat]);

  const handleLanguageChange = (value) => {
    localization.changeLanguage(value);
    setLanguage(value);
  };

  const handleChangeTimeZone = (selectedTimeZone) => {
    setTimeZone(selectedTimeZone);
  };

  return (
    <div className="preferences-container">
      <div className="div-select">
        <Select
          title={translate(LABELS.SELECT_LANGUAGES)}
          options={languageOptions}
          className='select-language'
          size='medium'
          widthOfSelect='11rem'
          value={language}
          onChange={handleLanguageChange}
        />
      </div>
      <div className="div-select">
        <Select
          className='select-time-zone'
          options={timeZoneOptions}
          title={translate(LABELS.SELECT_TIME_ZONE)}
          onChange={handleChangeTimeZone}
          value={timeZone}
          size='medium'
          widthOfSelect='11rem'
        />
      </div>
      <div className="div-select">
        <Select
          className='select-date-format'
          options={dateFormatOptions}
          value={dateFormat}
          onChange={setDateFormat}
          title={translate(LABELS.SELECT_DATE_FORMAT)}
          size='large'
          widthOfSelect='11rem'
        />
      </div>
    </div>
  );
};
Preferences.propTypes = {
  onUpdate: PropTypes.func.isRequired
};
export default Preferences;
