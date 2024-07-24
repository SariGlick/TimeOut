import React from 'react';
import axios from 'axios';
import './login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('מייל לא חוקי')
    .required('שדה חובה'),

  password: Yup.string()
    .required('שדה חובה')
    .matches(/[a-zA-Z]/, 'הסיסמא חייבת להכיל לפחות אות אחת')
    .matches(/\d/, 'הסיסמא חייבת להכיל לפחות ספרה אחת')
    .max(10, 'הסיסמא חייבת להכיל עד 10 תווים'),
});

function Login() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      const user = { em: values.email, pa: values.password };
      userLogin(user);
    },
  });

  const userLogin = async (user) => {
    try {
  
      const response = await axios.post('http://localhost:5004/users/signIn', {
        email: user.em,
        password: user.pa,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const idUserLogin = response.data;
      console.log(idUserLogin, "log");
      localStorage.setItem('currentname', idUserLogin.user.name);
      localStorage.setItem('currentuserId', idUserLogin.user._id);
      localStorage.setItem('currentuserEmail', idUserLogin.user.email);
      localStorage.setItem('token',idUserLogin.token)

    } catch (error) {
      console.log("errorAddCategory", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <h2> התחברות</h2>

      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
}


export default Login;
