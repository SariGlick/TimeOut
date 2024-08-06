import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, Typography, Tooltip } from '@mui/material';
import { Visibility, Delete, DataObject } from '@mui/icons-material';
import './List.scss';


const ListComponent = ({dataObject}) => {
    

    const [hoveredItem, setHoveredItem] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (itemId) => {
        setHoveredItem(itemId);
        setIsHovered(true);

    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
        setIsHovered(false);


    };

    const handleToggleRead =async (itemId,read,type) => {
       const newMessage={
        _id:itemId,
        read:!read,
        type:type
       }
       try {
        await axios.put(`http://localhost:5000/message/${itemId}`,newMessage)
          .then(res => {
            console.log(res.data)
          })
      }
      catch {
        console.log("faild")
      }
          
        };

    const deleteMassege = async(itemId) => {
        try {
            await axios.delete(`http://localhost:5000/message/${itemId}`)
              .then(res => {
                console.log(res.data)
              })
          }
          catch {
            console.log("faild")
          }
    };

    return (
        <div className="wrapper">
            <List>
                {dataObject.messageData.map(({ _id, read, type }) => (
                    <ListItem
                        key={_id}
                        onMouseEnter={() => handleMouseEnter(_id)}
                        onMouseLeave={handleMouseLeave}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <CommentIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={type.type} className={read ? 'read' : 'unread'} />
                        {hoveredItem === _id && (
                            <Tooltip title={read ? 'Mark as unread' : 'Mark as read'}>
                                <div className="icons-wrapper">

                                    <IconButton
                                        className="eye-icon"
                                        onClick={() => handleToggleRead(_id,read,type)}
                                        style={{ color: read ? '#474747' : 'rgb(27, 27, 27)' }}
                                    >

                                        {read && <div className="line"></div>}
                                        <Visibility />
                                    </IconButton>
                                    <IconButton onClick={() => deleteMassege(_id)}>
                                        <Delete />

                                    </IconButton>
                                </div>

                            </Tooltip>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

ListComponent.propTypes = {
    dataObject: PropTypes.shape({
        messageData: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                read: PropTypes.bool.isRequired,
                type: PropTypes.shape({
                    type: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default ListComponent;

