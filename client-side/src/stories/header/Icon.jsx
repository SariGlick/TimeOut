import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, IconButton } from '@mui/material';
import { MailOutline, Mail } from '@mui/icons-material';
import useWebSocket from '../../webSocket';
import './icon.scss';

const MessageIcon = () => {
  const user = useSelector(state => state.user.currentUser);
  const userId = user._id;
  const { cntUnreadMessages } = useWebSocket(userId);

  const hasUnreadMessages = cntUnreadMessages > 0;


  return (
    <IconButton className="iconButton">
      {hasUnreadMessages ? (
        <Badge badgeContent={cntUnreadMessages} color="error" className="badgeContent">
          <Mail />
        </Badge>
      ) : (
        <MailOutline />
      )}
    </IconButton>
  );
};

export default MessageIcon;
