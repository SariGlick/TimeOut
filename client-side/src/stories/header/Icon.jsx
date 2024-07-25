import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { MailOutline, Mail } from '@mui/icons-material';

const MessageIcon = ({ messages = [] }) => {
  const hasMessages = messages.length > 0;

  const handleClick = () => {
    //Displays a generic component with the list
  };

  const iconStyle = { color: 'rgb(103, 252, 210)' };

  return (
    <IconButton onClick={handleClick}>
      {hasMessages ? (
        <Badge badgeContent={messages.length} color="error">
          <Mail sx={iconStyle} />
        </Badge>
      ) : (
        <MailOutline sx={iconStyle} />
      )}
    </IconButton>
  );
};


export default MessageIcon;