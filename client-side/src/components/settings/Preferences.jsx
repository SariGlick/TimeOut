import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

import Select from '../../stories/Select/Select.jsx';
import { selectAuth } from '../../redux/auth/auth.selector.js';

import CONSTANTS from './constantSetting.js';
import './Preferences.scss';

const createTimeZones = () => moment.tz.names().map(timezone => ({ value: timezone, text: timezone }));

const Preferences = ({ onUpdate, data }) => {
  const { user } = useSelector(selectAuth);
  const { t: translate, i18n: localization } = useTranslation();
  const { LABELS, LANGUAGE, DATE_FORMATS } = CONSTANTS;

  const languageOptions = Object.keys(LANGUAGE).map(key => ({
    value: key,
    text: LANGUAGE[key]['text'],
    iconSrc: LANGUAGE[key]['icon']
  }));
  const initialLanguage = (data?.language || user?.preference?.language || languageOptions[1].value);
  const timeZoneOptions = createTimeZones();
  const defaultTimeZone = timeZoneOptions.find(option => option.value === "UTC")?.value || timeZoneOptions[0].value;
  const initialTimeZone = (data?.timeZone || user?.preference?.timeZone || defaultTimeZone);
  const initialDateFormat = (data?.dateFormat || user?.preference?.dateFormat || DATE_FORMATS[0].value);
  const [language, setLanguage] = useState(initialLanguage);
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [dateFormat, setDateFormat] = useState(initialDateFormat);

  const dateFormatOptions = DATE_FORMATS.map(({ value, label }) => ({
    text: translate(label),
    value: value
  }));

  const [prevValues] = useState({
    language:user?.preference.language,
    timeZone:user?.preference.timeZone,
    dateFormat:user?.preference.dateFormat
  });

  useEffect(() => {
    if (prevValues.language !== language) {
      onUpdate({ language });
    }
    else if(data && 'language' in data){
      onUpdate({ language: undefined });
    }
  }, [language]);

  useEffect(() => {
    if (prevValues.timeZone !== timeZone) {
      onUpdate({ timeZone });
    }else if(data && 'timeZone' in data){
      onUpdate({ timeZone: undefined });
    }
  }, [timeZone]);

  useEffect(() => {
    if (prevValues.dateFormat !== dateFormat) {
      onUpdate({ dateFormat });
    }else if(data && 'dateFormat' in data){
      onUpdate({ dateFormat: undefined });
      
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
          size='large'
          widthOfSelect='11rem'
          value={language}
          onChange={handleLanguageChange}
          data-testid="select-language"
        />
      </div>
      <div className="div-select">
        <Select
          className='select-time-zone'
          options={timeZoneOptions}
          title={translate(LABELS.SELECT_TIME_ZONE)}
          onChange={handleChangeTimeZone}
          value={timeZone}
          size='large'
          widthOfSelect='11rem'
          data-testid="select-time-zone"
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
          data-testid="select-date-format"
        />
      </div>
    </div>
  );
};
Preferences.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  data: PropTypes.object
};
export default Preferences;
