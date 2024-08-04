import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UnreadIcon from '@mui/icons-material/Mail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Message.scss'; 

const MessageListComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Message 1', read: false },
    { id: 2, text: 'Message 2', read: true },
    { id: 3, text: 'Message 3', read: true },
    { id: 4, text: 'Message 4', read: true },
    { id: 5, text: 'Message 5', read: true },
    { id: 6, text: 'Message 6', read: true },
    { id: 7, text: 'Message 7', read: true },
    { id: 8, text: 'Message 8', read: true },

  ]);

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const changeMessageStatus = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, read: !msg.read } : msg
    ));
  };

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id} className="message">
            <div>
              {message.text}
            </div>
            <div className="icon-wrapper">
              {message.read ?
                <UnreadIcon onClick={() => changeMessageStatus(message.id)} /> :
                <MailOutlineIcon onClick={() => changeMessageStatus(message.id)} />
              }
              <DeleteIcon onClick={() => deleteMessage(message.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageListComponent;
