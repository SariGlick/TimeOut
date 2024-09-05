import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { MailOutline, Mail } from '@mui/icons-material';
import './icon.scss';

const MessageIcon = ({ messages = [] }) => {
  let cntUnreadMessages = messages.filter(message => !message.read).length;
  const hasUnreadMessages = cntUnreadMessages > 0;

  const handleClick = () => {
    // Displays a generic component with the list
  };

  return (
    <IconButton onClick={handleClick} className="iconButton">
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