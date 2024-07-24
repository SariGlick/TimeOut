import React, { useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import GenericButton from '../../stories/Button/GenericButton.jsx'
import GenericInput from '../../stories/GenericInput/genericInput.jsx'
import { CHANGE_RINGTONE, SEND_PREFERENCE } from './constantSetting.js'

const Settings = ({ user }) => {
  const { emailFrequency, sendNotificationTime, _id } = user.preference;
  const url = process.env.REACT_APP_BASE_URL;
  const [ringtoneFile, setRingtoneFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageType = 'image/jpeg';

      if (file.type === validImageType) {
        setRingtoneFile(file);
        const audioUrl = URL.createObjectURL(e.target.files[0]);
        setAudioSrc(audioUrl);
      }
    }
  };

  const sendPreference = async () => {

    const formData = new FormData();
    formData.append('soundVoice', ringtoneFile);
    formData.append('sendNotificationTime', sendNotificationTime);
    formData.append('emailFrequency', emailFrequency);
    try {
      const response = await axios.put(`${url}/preferences/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    } catch (error) {
      console.error(error)
    }
  };


  return (

    <div>
      <div className='uploadWarper'>
        <GenericInput type='file' label={CHANGE_RINGTONE} onChange={handleFileChange} size='medium' className=""/>
      </div>
      <div>
        {audioSrc &&
          <audio controls>
            <source src={audioSrc} ></source>
          </audio>}
      </div>
      <GenericButton size='small' label={SEND_PREFERENCE} onClick={sendPreference} className=''  />
    </div>
  );
};
// Settings.propTypes = {
//   currentUser: PropTypes.object.isRequired,
// }
export default Settings;
