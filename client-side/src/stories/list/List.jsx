import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import './List.scss';

const ListComponent = ({ dataObject }) => {
    return (
        <div className="wrapper">
            <List>
                {dataObject.messageData.map(({ _id, read, type }) => (
                    <ListItem
                        key={_id}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <CommentIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={type.type}
                            className={read ? 'read' : 'unread'}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

ListComponent.propTypes = {
    dataObject: PropTypes.shape({
        messageData: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.shape({
                type: PropTypes.string.isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
};

export default ListComponent;
