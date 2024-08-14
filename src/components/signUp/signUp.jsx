import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './signUp.scss';
import PasswordStrengthMeter from '../signUp/PasswordStrength';
import GenericButton from '../../stories/Button/GenericButton';
import GenericInput from '../../stories/GenericInput/genericInput';
import MESSAGES from '../../constants';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService';
import { addUser } from '../../redux/user/user.slice';



const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/, MESSAGES.name.matches)
    .required(MESSAGES.name.required),
  email: Yup.string()
    .email(MESSAGES.email.invalid)
    .required(MESSAGES.email.required),
  password: Yup.string()
    .required(MESSAGES.password.required)
    .matches(/[A-Za-z]/, MESSAGES.password.matches.letters)
    .matches(/\d/, MESSAGES.password.matches.digits)
    .min(4, MESSAGES.password.min)
});
function SignUp() {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      userSignUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
  });
  const userSignUp = async (user) => {
    try {
  const response = await createUser(user); 
      localStorage.setItem("nameUser", user.name);
      dispatch(addUser(response.user));

      window.location.reload();
      
    } catch (error) {
      console.error("error");
    }
  };
  const [robotPass, setRobotPass] = useState(null)
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
            style={{ height: '50px', marginBottom: '16px' }}
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
            style={{ height: '50px', marginBottom: '16px' }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
           <GenericInput
            label="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
                formik.handleChange(e);
                setPassword(e.target.value);
              }}
            onBlur={formik.handleBlur}
            width="100%"
            size="medium"
            style={{ height: '50px', marginBottom: '16px' }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <PasswordStrengthMeter  password={password} />
        </div>
      <ReCAPTCHA
          sitekey='6Ld5uBoqAAAAAKwPXqo5eanm9ZFSuOoBBSdl00pE'
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

