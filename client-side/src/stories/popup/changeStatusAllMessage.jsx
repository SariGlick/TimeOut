import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import './MessageStatusUpdater.scss';

const MessageStatusUpdater = () => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleUpdateStatus = async (readStatus) => {
        for (const message of messages) {
            try {
                await update(message.id, readStatus);
            } catch (error) {
                console.error(`Error updating message with id ${message.id}:`, error);
            }
        }
    };

    return (
        <div className="message-status-updater">
            <Tooltip title="Mark all messages as read" arrow>
                <IconButton
                    className={`icon-button ${hoveredIcon === 'read' ? 'read' : ''}`}
                    onClick={() => handleUpdateStatus(true)}
                    onMouseEnter={() => setHoveredIcon('read')}
                    onMouseLeave={() => setHoveredIcon(null)}
                >
                    <CheckCircleOutline />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark all messages as unread" arrow>
                <IconButton
                    className={`icon-button ${hoveredIcon === 'unread' ? 'unread' : ''}`}
                    onClick={() => handleUpdateStatus(false)}
                    onMouseEnter={() => setHoveredIcon('unread')}
                    onMouseLeave={() => setHoveredIcon(null)}
                >
                    <RadioButtonUnchecked />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default MessageStatusUpdater;
