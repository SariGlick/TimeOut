
import React, { useState, useContext, useEffect } from "react";
import '../../style/forgetPassword.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../stories/Button/GenericButton";
import GenericInput from "../../stories/GenericInput/genericInput";
import { RecoveryContext } from "../../App";
import { getCode } from "../../axios/login-services";
import Text from "./Text";
import ProfileActivationTimer from "./ProfileActivation";

export default function OTPInput() {
  const { email, otp, setPage, setOTP } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(2);
  const [OTPinput, setOTPinput] = useState(['', '', '', '']);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState('');
  const [pasteError, setPasteError] = useState(''); // State for paste error message
  const [showOTP, setShowOTP] = useState(false); // State for showing OTP
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 2) {
          clearInterval(interval);
          if (lastTimerCount === 0) setDisable(false);
          return lastTimerCount;
        }
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  useEffect(() => {
    // Enable the button only if all OTP fields are filled
    const allFilled = OTPinput.every((value) => value.length === 1);
    setError(allFilled ? '' : Text.warning.FILL_ALL_FIELDS);
  }, [OTPinput]);

  const handleInputChange = (e, i) => {
    const newValue = e.target.value;
    // Only accept numeric values
    if (/^\d$/.test(newValue) || newValue === '') {
      const updatedOTPinput = [...OTPinput];
      updatedOTPinput[i] = newValue;
      setOTPinput(updatedOTPinput);
      setError(''); // Clear error if the input is valid
    } else {
      setError(Text.warning.NUMERIC_VALUE);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent input of non-numeric values
    if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
      setError(Text.warning.NUMERIC_VALUE);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent pasting
    setPasteError(Text.warning.NUMERIC_VALUE);
  };

  const resendOTP = () => {
    const newOTP = Math.floor(Math.random() * 9000 + 1000);
    alert(`New OTP: ${newOTP}`); // Just for testing; consider removing this in production
    setOTP(newOTP);
    setDisable(true);
    getCode(email, newOTP);
    setTimer(2);
    setError('');
    setPasteError(''); // Clear paste error on resend
  };

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      navigate("/Reset");
    } else {
      setError(Text.failure.WRONG_PASSWORD);
    }
  };

  const handleClickShowOTP = () => {
    setShowOTP(!showOTP);
  };

  return (
    <div className="everything">
      <h2>Email Verification</h2>
      <h3>{Text.info.SEND_EMAIL} {email}</h3>
      <form>
        <div className="otp-inputs">
          {OTPinput.map((value, index) => (
            <div key={index} className="otp-input-container">
              <GenericInput
                label=""
                type={showOTP ? "text" : "password"} // Show OTP if the state is true
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                size="medium"
                width="55px"
                name={`OTP-${index}`}
                maxLength={1}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Restrict to numbers only
              />

            </div>
          ))}
          <IconButton onClick={handleClickShowOTP} className="visibility-icon">
            {showOTP ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <div className="otp-inputs">
           
          <GenericButton
            className="primary"
            label="Verify Account"
            onClick={verifyOTP}
            size="small"
            disabled={!!error}
          />
          <GenericButton
            className="primary"
            label={Text.info.RESET_CODE}
            onClick={resendOTP}
            size="small"
          />
        </div>
        {error && <div className="error">{error}</div>}
        {pasteError && <div className="error">{pasteError}</div>}
        <div className="timer-container">
          <div className='timer'>
            <ProfileActivationTimer profileActivationTime={timerCount} />
          </div>
        </div>
      </form>
    </div>
  );
}
