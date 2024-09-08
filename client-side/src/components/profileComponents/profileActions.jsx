import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button } from '@mui/material';
import { TOOLTIP_TEXTS, BUTTON_LABELS } from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

export default function ProfileActions({ handleSave, handleClose, handleDelete }) {
    return (
        <>
            <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                <Button className='cancel-button' onClick={handleClose}>
                    {BUTTON_LABELS.CANCEL}
                </Button>
            </Tooltip>
            <Tooltip title={TOOLTIP_TEXTS.SAVE}>
                <Button color="success" type="submit" onClick={handleSave}>
                    {BUTTON_LABELS.SAVE}
                </Button>
            </Tooltip>
            <Tooltip title={TOOLTIP_TEXTS.DELETE_PROFILE}>
                <Button color="error" onClick={handleDelete}>
                    {BUTTON_LABELS.DELETE_PROFILE}
                </Button>
            </Tooltip>
        </>
    );
}

ProfileActions.propTypes = {
    handleSave: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

ProfileActions.defaultProps = {
    handleSave: () => {},
    handleClose: () => {},
    handleDelete: () => {},
};
