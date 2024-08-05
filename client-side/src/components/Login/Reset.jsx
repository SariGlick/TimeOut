
import React, { useState, useContext } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../style/forgetPassword.scss'
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../App";
import GenericButton from "../../stories/Button/GenericButton";
import GenericInput from "../../stories/GenericInput/genericInput";
import PasswordStrengthMeter from "./PasswordStrengthMeter ";
import Text from "./Text";
import { resetPassword } from "../../axios/login-services";

export default function Reset() {
  const { email } = useContext(RecoveryContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false); 
   const [isSubmit, setSubmit] = useState(false)
  const navigate = useNavigate();
 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSetSubmit = () =>{
    setSubmit (true)
  }

  // Validate passwords function
  const validatePasswords = (password, confirmPassword) => {
    if (!password) return { error: true, helperText: Text.warning.REQ_PASS };
    if (!confirmPassword) return { error: true, helperText: Text.warning.REQ_CONFIRM };
    if (password !== confirmPassword) return { error: true, helperText: Text.warning.NOT_MATCH };
    if (isSubmit&&password==confirmPassword) return { error: false, helperText: Text.success.MATC_PASS};
    if (password==confirmPassword) return { error: false};
    
  };

  // Handler for password input changes
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordFilled(newPassword.length > 0); 
    const validationResult = validatePasswords(newPassword, confirmPassword);
    setError(validationResult.helperText);
  };

  // Handler for confirm password input changes
  const handleConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    const validationResult = validatePasswords(password, newConfirmPassword);
    setError(validationResult.helperText);
  };

  // Handler for form submission
  const submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const validationResult = validatePasswords(password, confirmPassword);
    if (!validationResult.error) {
      try {
        await resetPassword(email, password);
        navigate("/Home");
      } catch (err) {
        setError(Text.failure.ERR_RESET_PASS); 
      }
    } else {
      setError(validationResult.helperText);
    }
  };
  return (
    <div>
      <section className="pas">
        <form className="everything" >
          <h2 className="pass">Change Password</h2>
          <div className="first">
            <GenericInput
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePassword}
              size="medium"
              width="200px"
            />
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <div className="second">
            <GenericInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              size="medium"
              width="200px"
              disabled={!isPasswordFilled} 
            />
            <IconButton onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <PasswordStrengthMeter  password={password} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          <GenericButton
            className="primary"
            label="Reset Password"
            onClick={submit}
            size="medium"
            disabled={!!error} // Disable the button if there is an error
          />
        </form>
      </section>
    </div>
  );
}
