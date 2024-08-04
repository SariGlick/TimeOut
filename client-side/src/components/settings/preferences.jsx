import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import Select from '../../stories/Select/Select.jsx'
import {LANGUAGE,LABELS} from './constantSetting.js'

 const  Preferences =()=> {
    const [lng,setLng] =useState('en');
    const {t,i18n}= useTranslation();
    const handleLngChange=(value)=>{
        console.log('value= ', value);
         i18n.changeLanguage(value);
            setLng(value)
       }
  return (
    <Select  title={t(LABELS.SELECT_LANGUAGES)} 
      options={Object.keys(LANGUAGE).map(key=>({
        value:key,
        text:LANGUAGE[key]['text'],
        iconSrc:LANGUAGE[key]['icon']
      }))} 
      className='select-class' 
      size={'large'}
      widthOfSelect='200px'
      onChange={handleLngChange}/>  )
}
export default Preferences;