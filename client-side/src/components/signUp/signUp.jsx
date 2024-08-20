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
import { MessagesSignUp } from '../../constants';
import { createUser } from '../../services/userService';
import { addUser } from '../../redux/user/user.slice';

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
  const [robotPass, setRobotPass] = useState(null)
  const url = process.env.REACT_APP_SITEKEY;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      userSignUp(values);
    },
  });
  const userSignUp = async (user) => {
    try {
      await createUser(user); 
      dispatch(addUser(user));
      window.location.href="/home"
    } catch (error) {
      console.error("The user is not included in the system");
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
          <PasswordStrengthMeter  password={password} />
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

