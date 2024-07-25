import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import './GenericButton.scss';

const GenericButton = ({ className, label, onClick, size = "medium", disabled = false, icon = null, onIconClick = () => {} }) => (
    <div className='buttonWrapper'>
        <Button
            className={`genericButton ${className ? `genericButton ${className}` : ''}`}
            onClick={onClick}
            size={size}
            disabled={disabled}
            endIcon={icon && (
                <IconButton onClick={onIconClick}>
                    {React.cloneElement(icon)}
                </IconButton>
            )}
        >
            {label}
        </Button>
    </div>
);

GenericButton.propTypes = {
    className: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.elementType,
    onIconClick: PropTypes.func,
};

export default GenericButton;
