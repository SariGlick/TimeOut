import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import { selectAuth } from '../../redux/auth/auth.selector';
import Select from "../../stories/Select/Select";
import GenericInput from '../../stories/GenericInput/genericInput'
import CONSTANTS from './constantSetting';
import './messages.scss'





const Messages = ({ onUpdate }) => 
{
    const { TITLES, MESSAGE_DISPLAY_ENUM , LABELS,INBOX_ENUM} = CONSTANTS;
    const { currentUser } = useSelector(selectAuth); 
    const initialMessageDisplay = currentUser?.messageDisplay || 'title_only';
    const initialinboxMessages = currentUser?.inboxMessages || 'group_by_date';
    const initialMessagesCount = currentUser?.messagesCount || 0;
    const [messageDisplay, setMessageDisplay] = useState(initialMessageDisplay);
    const [inboxMessages, setinboxMessages] = useState(initialinboxMessages);
    const [messagesCount,setMessagesCount]=useState(initialMessagesCount);
    const {t}=useTranslation();

    useEffect(() => {
        if (currentUser) {
            onUpdate({
                messageDisplay,
                inboxMessages,
                messagesCount
            });
        }
    }, [messageDisplay, inboxMessages, messagesCount, currentUser]);

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
          onChange={setinboxMessages}
          value={inboxMessages}
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
