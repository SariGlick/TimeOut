import React, { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import { MailOutline, Mail } from '@mui/icons-material';
import useWebSocket from '../../webSocket';
import { useSelector } from 'react-redux';
import messages from '../../components/messages/messages'
import './icon.scss';

const MessageIcon = () => {
  const [openMesagges,setOpenMesagges] = useState(false);
  const user = useSelector(state => state.user.currentUser);
  const userId = user._id;
  const { cntUnreadMessages } = useWebSocket(userId);

  const hasUnreadMessages = cntUnreadMessages > 0;


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
