import React, { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import { MailOutline, Mail } from '@mui/icons-material';
import useWebSocket from '../../webSocket';
import messages from '../../components/messages/messages'
import './icon.scss';

const MessageIcon = () => {
  const [openMesagges,setOpenMesagges] = useState(false);
  const userId = '66961bef8ca0916dcbfdabc3'; //change the userId according the correct user...
  const { cntUnreadMessages } = useWebSocket(userId);

  const hasUnreadMessages = cntUnreadMessages > 0;

  const handleClick = () => {
    // Displays a generic component with the list
  };

  return (
    <IconButton onClick={()=>{setOpenMesagges(!openMesagges);}} className="iconButton">
      {hasUnreadMessages ? (
        <Badge badgeContent={cntUnreadMessages} color="error" className="badgeContent">
          <Mail />
        </Badge>
      ) : (
        <MailOutline />
      )}
      {openMesagges &&  <messages/>}
    </IconButton>
  );
};

export default MessageIcon;
