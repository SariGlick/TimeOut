import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PasswordStrengthMeter from '../signUp/PasswordStrength';
import GenericButton from '../../stories/Button/GenericButton';
import GenericInput from '../../stories/GenericInput/genericInput';
import { MessagesSignUp } from '../../constants';
import { createUser } from '../../services/userService';
import { addUser } from '../../redux/user/user.slice';
import { setCurrentUser } from '../../redux/auth/auth.slice';
import './signUp.scss';


const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/, MessagesSignUp.name.matches)
    .required(MessagesSignUp.name.required),
  email: Yup.string()
    .email(MessagesSignUp.email.invalid)
    .required(MessagesSignUp.email.required),
  password: Yup.string()
    .required(MessagesSignUp.password.required)
    .matches(/[A-Za-z]/, MessagesSignUp.password.matches.letters)
    .matches(/\d/, MessagesSignUp.password.matches.digits)
    .min(4, MessagesSignUp.password.min)
});
function SignUp() {
  const [password, setPassword] = useState('');
  const [robotPass, setRobotPass] = useState(null);
  const url = process.env.REACT_APP_SITEKEY;
  const apiUrl =process.env.REACT_APP_SERVER_URL
  const { t: translate, i18n: localization } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const askForPermission = async () => {
    const permission = window.confirm('Allow us to get your location and preferred language for a better experience?');
    if (permission) {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const fullLanguage = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language) || 'en';
              const userLanguage = fullLanguage.slice(0, 2); 
              resolve({ timeZone: userTimeZone, language: userLanguage });
            },
            (error) => {
              console.error('Error getting location:', error);
              resolve({ timeZone: 'UTC', language: 'en' }); 
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          resolve({ timeZone: 'UTC', language: 'en' }); 
        }
      });
    } else {
      return { timeZone: 'UTC', language: 'en' };
    }
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      const { timeZone, language } = await askForPermission();
      userSignUp(values, timeZone, language);
    },
  });
  const userSignUp = async (user, timeZone, language) => {
    try {
      const userWithPreferences = {
        ...user,
        preference: {
          timeZone,
          language,
        },
      };
      await createUser(userWithPreferences);
      dispatch(addUser(userWithPreferences));
      const loginResponse = await axios.post(`${apiUrl}/users/signIn`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const userData = loginResponse.data;
      localStorage.setItem('userId', userData._id);
      dispatch(setCurrentUser(userData));
      localization.changeLanguage(userData.preference.language);
      navigate('/home');
    } catch (error) {
      console.error("The user is not included in the system");
      throw error;
    }
  };

  return (
    <div className="signup-container">
      <h2 >signUp </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <GenericInput
            label="user name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            width="100%"
            size="medium"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <GenericInput
            label="email"
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            width="100%"
            size="medium"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group" >
          <GenericInput
            label="password"
            type="password"
            name="password"

            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setPassword(e.target.value);
            }}

            width="100%"
            size="medium"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <PasswordStrengthMeter password={password} />
        </div>
        <ReCAPTCHA
          sitekey={url}

          onChange={(val) => setRobotPass(val)}
        />
        <GenericButton
          className="secondary"
          label="signUp"
          onClick={formik.handleSubmit}
          size="medium"
          disabled={formik.isSubmitting || !robotPass}
        />
      </form>
    </div>
  );
}
export default SignUp;

