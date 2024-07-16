import React from 'react';
import axios from 'axios';
import './signUp.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/, 'יש להזין רק אותיות ')
    .required('שדה חובה'),

  email: Yup.string()
    .email('מייל לא חוקי')
    .required('שדה חובה'),

  password: Yup.string()
    .required('שדה חובה')
    .matches(/[a-zA-Z]/, 'הסיסמא חייבת להכיל לפחות אות אחת')
    .matches(/\d/, 'הסיסמא חייבת להכיל לפחות ספרה אחת')
    .min(4, 'הסיסמא חייבת לפחות  4 תווים')
    .max(20, 'הסיסמא חייבת להכיל עד 20 תווים'),
});

function SignUp() {
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
      const response = await axios.post('http://localhost:5003/users/users/', {
        name: user.name,
        email: user.email,
        password: user.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("User signed up successfully:", response.data);
      localStorage.setItem("nameUser",user.name)
      window.location.reload();
      // ניתוב לדף אחר או פעולות נוספות
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("Error signing up:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>הרשמה חדשה</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">שם מלא:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">מייל:</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמא:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">הרשם</button>
      </form>
    </div>
  );
}

export default SignUp;
