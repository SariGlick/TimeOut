import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx'
import CONSTANTS from './constantSetting.js'
import moment from 'moment-timezone';
import { format } from 'date-fns';
import './Preferences.scss';

const createTimeZones = () => {
  return moment.tz.names().map(timezone => ({
    value: timezone,
    text: timezone,
  }));
};

const formatDate = (date, dateFormat) => {
  return format(date, dateFormat);
};

const Preferences = ({ currentUser, onUpdate}) => {
  const {  LABELS, LANGUAGE,DATE_FORMATS } = CONSTANTS;
  const { timeZone: initialTimeZone, language: initialLanguage, dateFormat: initialDateFormat } = currentUser.preference;
  const [language, setLanguage] = useState(initialLanguage);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [dateFormat, setDateFormat] = useState(initialDateFormat)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    onUpdate({
      language,
      timeZone,
      dateFormat
    });
  }, [language, timeZone, dateFormat, onUpdate]);

  const handleLanguageChange = (value) => {
    i18n.changeLanguage(value);
    setLanguage(value)
  }

  const handleChangeTimeZone = (selectedTimeZone) => {
    setTimeZone(selectedTimeZone);
  };

  return (
    <div>
      <Select
        title={t(LABELS.SELECT_LANGUAGES)}
        options={Object.keys(LANGUAGE).map(key => ({
          value: key,
          text: LANGUAGE[key]['text'],
          iconSrc: LANGUAGE[key]['icon']
        }))}
        className='select-class'
        size='medium'
        widthOfSelect='210px'
        value={language}
        onChange={handleLanguageChange}
      />
      <Select
        className='select-time-zone'
        options={createTimeZones().map(tz => ({
          text: tz.text,
          value: tz.value
        }))}
        title={t(LABELS.SELECT_TIME_ZONE)}
        onChange={handleChangeTimeZone}
        value={timeZone}
        size='medium'
        widthOfSelect='210px'
      />
      <Select
        className='select-date-format'
        options={DATE_FORMATS.map(({ value, label }) => ({
          text: t(label),
          value: value
          
        }))}
        value={dateFormat}
        onChange={setDateFormat}
        title={t(LABELS.SELECT_DATE_FORMAT)}
        size='large'
        widthOfSelect='210px'
      />
    </div>
  )
};
Preferences.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}
export default Preferences;
