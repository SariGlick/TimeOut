import React from 'react';
import PropTypes from 'prop-types';
import { Radio, FormControlLabel, RadioGroup, FormControl } from '@mui/material';
import './radio-Button.scss';

const RadioButtonComponent = ({ options, selectedOption, onChange }) => {
    return (
        <FormControl component="fieldset" className="custom-radio-group">
            <RadioGroup value={selectedOption} onChange={onChange}>
                {options.map(option => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio className="custom-radio" />}
                        label={option.label}
                        className={`custom-form-control-label ${selectedOption === option.value ? 'Mui-checked' : ''}`}
                        labelPlacement="start"
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

RadioButtonComponent.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const RadioButton = React.memo(RadioButtonComponent);

export default RadioButton;
