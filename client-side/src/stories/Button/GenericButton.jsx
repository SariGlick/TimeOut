import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import './GenericButton.scss';

const GenericButton = ({ className, label, onClick, size = "medium", disabled = false, icon: Icon=null }) => (
    <div className='buttonWrapper'>
        {Icon ? (
            <IconButton
                className={`genericIconButton ${className || ''}`}
                onClick={onClick}
                size={size}
                disabled={disabled}
            >
                <Icon />
            </IconButton>
        ) : (
            <Button
            className={`genericButton ${className ? className : ''} ${size}`} 
                onClick={onClick}
                size={size}
                disabled={disabled}
            >
                {label}
            </Button>
        )}
    </div>
);

GenericButton.propTypes = {
    className: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.elementType,
};

export default GenericButton;