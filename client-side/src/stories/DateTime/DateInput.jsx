import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./DateInput.scss";

const DateInput = ({ onChange }) => {
  return (
    <div className="timeInputWrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ style: { fontSize: "14px" }}}
              inputFormat="dd-MM-yyyy"
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DateInput;