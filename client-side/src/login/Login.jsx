import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Alert, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.scss';
import GenericButton from '../stories/Button/GenericButton';
import GenericInput from '../stories/GenericInput/genericInput';
import { setCurrentUser } from '../redux/auth/auth.slice';
import { MESSAGES } from '../constants';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email(MESSAGES.INVALID_EMAIL_FORMAT).required(MESSAGES.EMAIL_REQUIRED),
  password: Yup.string().required(MESSAGES.PASSWORD_REQUIRED),
});

function Login({ apiUrl =process.env.REACT_APP_SERVER_URL}) {
  const [error, setError] = useState(null);
  const [isNotExists, setIsNotExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [robotPass, setRobotPass] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      const user = { email: values.email, password: values.password };
      userLogin(user);
    },
  });

  const userLogin = async (user) => {
    try {
      if (!robotPass) {
        setError(MESSAGES.RECAPTCHA_ERROR);
        setIsNotExists(true);
        return;
      }
      setError(null);
      const loginResponse = await axios.post(`${apiUrl}/users/signIn`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userData = loginResponse.data;
      localStorage.setItem('userId', userData.user._id);
      dispatch(setCurrentUser(userData.user));

      navigate('/');
    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          setError(MESSAGES.INVALID_EMAIL_PASSWORD);
        } else {
          setError(MESSAGES.UNEXPECTED_ERROR);
        }
      } else if (error.request) {
        setError(MESSAGES.NETWORK_ERROR);
      } else {
        setError(MESSAGES.UNEXPECTED_ERROR);
      }
      setIsNotExists(true);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSignUpClick = () => navigate('/Signup');

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    formik.handleChange(e);
    setError(null);
    setIsNotExists(false);
  };

  return (
    <div className="login-container">
      <h2>{MESSAGES.WELCOME_BACK}</h2>
      <div className="signup-link">
      {MESSAGES.SIGNUP_PROMPT} <span onClick={handleSignUpClick} className="signup-text"> {MESSAGES.SIGNUP_LINK}</span>.
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="email">
          <div className="form-group">
            <GenericInput
              label={MESSAGES.EMAIL_LABEL}
              type="email"
              name="email"
              value={formik.values.email}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              width="100%"
              size="medium"
              placeholder={MESSAGES.EMAIL_PLACEHOLDER}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="password">

            <GenericInput
              label={MESSAGES.PASSWORD_LABEL}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formik.values.password}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              width="150%"
              size="medium"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <IconButton
              className='icon'
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SECRET_CODE_CAPVAL}
          onChange={(val) => setRobotPass(val)}
        />
        <GenericButton
          className="secondary"
          label="Login"
          onClick={formik.handleSubmit}
          size="medium"
          disabled={formik.isSubmitting}
        />
        {isNotExists && <Alert className="alert-error" severity="error">{error}</Alert>}
      </form>
    </div>
  );
}

Login.propTypes = {
  apiUrl: PropTypes.string,
};

export default Login;
