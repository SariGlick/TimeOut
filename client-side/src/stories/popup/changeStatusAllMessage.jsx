import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import './MessageStatusUpdater.scss'; // Import the SCSS file

const MessageStatusUpdater = () => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleUpdateStatus = async (readStatus) => {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ read: readStatus })
        });

        const data = await response.text();
        console.log(data); // Output: 'Status updated successfully'
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
