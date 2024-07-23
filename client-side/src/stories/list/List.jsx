import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import './List.scss'

export default function ListComponenet({ dataObject }) {

    return (
        <div className="wrapper" >
            <List >
                {dataObject.messageData && dataObject.messageData.map((value) => (
                    <ListItem
                        key={value}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <CommentIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText style={{ color: value.read ? 'rgb(112, 112, 112)' : 'rgb(0, 0, 0)' }} primary={`${value.message}`} />
                    </ListItem>
                ))}
            </List>
        </div>

    );

}

ListComponenet.prototype = {
    dataObject: PropTypes.shape({}).isRequired
}








