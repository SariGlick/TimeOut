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

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ apiUrl = 'http://localhost:5004' }) {
  const [error, setError] = useState(null);
  const [isNotExists, setIsNotExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capVal, setCapVal] = useState(null);
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
      if (!capVal) {
        setError('Please complete the ReCAPTCHA to proceed.');
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


      dispatch(setCurrentUser(userData.user));

      navigate('/');
    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        setError('Unable to connect to the server. Please check your network connection.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
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
      <h2>Welcome back</h2>
      <div className="signup-link">
        Don't have an account? <span onClick={handleSignUpClick} className="signup-text">Sign up</span>.
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="email">
          <div className="form-group">
            <GenericInput
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              width="100%"
              size="medium"
              placeholder="example@example.com"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="password">

            <GenericInput
              label="Password"
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
          onChange={(val) => setCapVal(val)}
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
