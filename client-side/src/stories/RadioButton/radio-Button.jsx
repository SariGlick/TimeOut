import React from 'react';
import PropTypes from 'prop-types';
import { Radio, FormControlLabel, RadioGroup, FormControl } from '@mui/material';
import './radio-Button.scss';

<<<<<<< HEAD
const RadioButtonComponent = ({ name, options = [], selectedOption, onChange }) => {
    return (
        <FormControl component="fieldset" className="custom-radio-group">
            <RadioGroup value={selectedOption} onChange={onChange} name={name} row>
=======
const RadioButtonComponent = ({ options, selectedOption, onChange }) => {
    return (
        <FormControl component="fieldset" className="custom-radio-group">
            <RadioGroup value={selectedOption} onChange={onChange}>
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
                {options.map(option => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
<<<<<<< HEAD
                        label={option.label}
                        control={<Radio className="custom-radio" />}
                        className={`custom-form-control-label ${selectedOption === option.value ? 'Mui-checked' : ''}`}
                        labelPlacement="end"
=======
                        control={<Radio className="custom-radio" />}
                        label={option.label}
                        className={`custom-form-control-label ${selectedOption === option.value ? 'Mui-checked' : ''}`}
                        labelPlacement="start"
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

RadioButtonComponent.propTypes = {
<<<<<<< HEAD
    name: PropTypes.string.isRequired,
=======
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
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
