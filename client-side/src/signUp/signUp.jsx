import React from 'react';
import axios from 'axios';
import './signUp.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordStrengthMeter from '../signUp/PasswordStrength';
import { useState } from 'react';
import Button   from '../stories/Button/GenericButton'
import GenericButton from '../stories/Button/GenericButton';
import GenericInput from '../stories/GenericInput/genericInput';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/,'The field must contain only letters')
    .required('required field'),

  email: Yup.string()
    .email('invalid email')
    .required('required field'),

  password: Yup.string()
    .required('required field')
    .matches(/[A-Za-z]/, 'field must contain english letter')
    .matches(/\d/, 'field must contain one digit')
    .min(4, 'password must  contain at least 4 characters')
    .max(20, ' password must be up to 20 characters'),
});

function SignUp() {
  const [password, setPassword] = useState('');
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      userSignUp(user);
    },
  });

  const userSignUp = async (user) => {
    try {
      console.log("userSignUp", user);
      const response = await axios.post('http://localhost:5000/users/', {
        name: user.name,
        email: user.email,
        password: user.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const idUserLogin = response.data;
      console.log("User signed up successfully:", response.data);
      console.log(idUserLogin, "log");
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("nameUser", user.name);
      window.location.reload();
    } catch (error) {
      console.error("error");
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
            // error={formik.touched.email && Boolean(formik.errors.email)}
            // helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
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
        {/* <button type="submit">הרשם</button> */}
        <GenericButton
          className="secondary"
          label="signUp"
          onClick={formik.handleSubmit}
          // onClick={send()}
          size="medium"
          disabled={formik.isSubmitting}
        />
      </form>
    </div>
  );
}

export default SignUp;
