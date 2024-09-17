import React from 'react';
import { Tooltip, Button } from '@mui/material';
import { TOOLTIP_TEXTS, BUTTON_LABELS } from '../../constants/profileConstants.js';

export default function ProfileActions({ handleSave, handleClose, handleDelete }) {
    return (
        <>
            <Tooltip title={TOOLTIP_TEXTS.CANCEL}>
                <Button sx={{ color: ' rgb(103, 252, 210) ' }} onClick={handleClose}>
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
