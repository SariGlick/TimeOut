import React, { useState,useEffect, useRef } from 'react';
import Select from "../../stories/Select/Select";
import GenericInput from '../../stories/GenericInput/genericInput'
import CONSTANTS from './constantSetting';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/auth.selector.js'
import './messages.scss'



const Messages = ({ /*currentUser,*/ onUpdate }) => {
    const { TITLES, MESSAGE_DISPLAY_ENUM , LABELS,INBOX_ENUM} = CONSTANTS;
    const { user } = useSelector(selectAuth);
    // const { t: translate, i18n: localization } = useTranslation();
    // const currentUser = useSelector(state => state.user); 
    // const { timeZone: initialTimeZone="UTC", dateFormat: initialDateFormat="YYYY-MM-DD" } = user.preference;
    // const { messageDisplay: initialMessageDisplay ="title_only", inboxDisplay: initialInboxDisplay ="group_by_date",
    //  messagesCount: initialMessagesCount= 0}=user.preference;
    const initialMessageDisplay = user?.messageDisplay || 'title_only';
    const initialInboxDisplay = user?.inboxDisplay || 'group_by_date';
    const initialMessagesCount = user?.messagesCount || 0;
    const [messageDisplay, setMessageDisplay] = useState(initialMessageDisplay);
    const [inboxDisplay, setInboxDisplay] = useState(initialInboxDisplay);
    const [messagesCount,setMessagesCount]=useState(initialMessagesCount);
    const {t}=useTranslation();

    const prevValues = useRef({
            messageDisplay,
            inboxDisplay,
            messagesCount
          });
    
          useEffect(() => {
            const changes = {};
            if (prevValues.current.messageDisplay !== messageDisplay) {
                changes.messageDisplay = messageDisplay;
            }
            if (prevValues.current.inboxDisplay !== inboxDisplay) {
                changes.inboxDisplay = inboxDisplay;
            }
            if (prevValues.current.messagesCount !== messagesCount) {
                changes.messagesCount = messagesCount;
            }
            if (Object.keys(changes).length > 0) {
                onUpdate(changes);
                prevValues.current = {
                    messageDisplay,
                    inboxDisplay,
                    messagesCount
                };
            }
        }, [messageDisplay, inboxDisplay, messagesCount, onUpdate]);

    // if (!currentUser) {
    //     return <div>Loading...</div>; 
    // }

    return (
        <div className="messages-settings">
            <Select 
                className="select-messages-inbox"
                options={MESSAGE_DISPLAY_ENUM.map(({ value, label }) => ({
                    text: t(label),
                    value: value
                    
                  }))}
                title={t(TITLES.MESSAGE_BOX)} 
                size={'large'}
                widthOfSelect='200px'
                value={messageDisplay}      
                onChange={setMessageDisplay}
            /> 

            <GenericInput
                type="number"
                label={t(LABELS.MESSAGES_COUNT)}
                value={messagesCount}
                onChange={setMessagesCount}
                size="medium"
                width='200px'           
            />    

        <Select
          className='select-inbox'
          options={INBOX_ENUM.map(({ value, label }) => ({
            text:t(label),
            value: value          
          }))}
          title={t(TITLES. MESSAGES_INBOX)}
          onChange={setInboxDisplay}
          value={inboxDisplay}
           size={'large'}
          widthOfSelect='200px'
        />
        </div>
    )
    
}

Messages.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
    };


export default Messages;
