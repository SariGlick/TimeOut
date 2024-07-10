import React from 'react';

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import './GenericButton.scss';



const GenericButton = ({className, label, onClick, size = "medium", disabled = false})=>{
    return(
        <div className='buttonWrapper'>
            <Button 
            className={`genericButton ${className ? `genericButton ${className}` : ''}`}
            onClick={onClick}
            size={size}
            disabled={disabled}
            >
            {label}
            </Button>
        </div>
    );
};

GenericButton.propTypes = {
    
    className: PropTypes.string.isRequired,
    
    //How large should the button be?
    size: PropTypes.oneOf(['small', 'medium','large']),
    
    //Button contents
    label: PropTypes.string.isRequired,
    
    //Click handler
    onClick: PropTypes.func.isRequired,

    //Optional is disabled
    disabled: PropTypes.bool,
};

export default GenericButton;