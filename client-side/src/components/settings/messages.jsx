import React, { useState } from "react";
import Select from "../../stories/Select/Select";
import CONSTANTS from '../../constants/index';
import {uploadFile} from '../settings/uploadFileUtil';
import PropTypes from 'prop-types';


const Messages = ({ currentUser }) => {
    const { TITLES, MESSAGE_DISPLAY } = CONSTANTS;
    const messageDisplay = currentUser?.messageDisplay || 'title_only'; 
    const [display, setDisplay] = useState(messageDisplay);
    const baceUrl = process.env.REACT_APP_BASE_URL;

    const sendFormatDate = async () => {
        try {
          const formData = new FormData();
          formData.append('display', display);
    
          const url = `${baceUrl}/users/${currentUser._id}`;
          await uploadFile(url, formData, 'put');
    
        } catch (error) {
          console.error('Error sending format date:', error);
        }
      };

    const handleDisplayChange = (value) => {
        setDisplay(value);       
    };

    return (
        <>
            <Select 
                title={TITLES.MESSAGE_BOX} 
                options={ MESSAGE_DISPLAY.map(displayMessage => ({
                    value: displayMessage.dataKey,
                    text: displayMessage.title,
                }))}
                className='message-display' 
                size={'large'}
                widthOfSelect='200px'
                value={display}      
                onChange={handleDisplayChange}
            />        
        </>
    )
    
}

Messages.propTypes = {
    currentUser: PropTypes.shape({
        messageDisplay: PropTypes.string,
    }),
  };

export default Messages;
