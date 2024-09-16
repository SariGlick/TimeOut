import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./DateInput.scss";

const DateInput = ({ onChange,format  }) => {
  return (
    <div className="timeInputWrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={onChange}
          format={format}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ style: { fontSize: "14px" }}}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
};

export default DateInput;