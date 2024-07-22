import React from 'react';
import axios from 'axios';
import './login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Alert, Button } from '@mui/material';
import GenericButton from '../stories/Button/GenericButton';
import GenericInput from '../stories/GenericInput/genericInput';
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('required field'),
  password: Yup.string()
    .required('required field')
});

function Login() {
  const [password, setPassword] = useState('');
  const [notexist,setNotexist]=useState(false)
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log(values,"rtrt");
      const user = { em: values.email, pa: values.password };
      userLogin(user);
    },
  });
  function refreshPageAfter3Seconds() {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  const userLogin = async (user) => {
    try {
      console.log("userLogin", user);
      const response = await axios.post('http://localhost:5000/users/signIn', {
        email: user.em,
        password: user.pa,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const idUserLogin = response.data;
      console.log(idUserLogin, "log");
      localStorage.setItem("accessToken", response.data.token);
      if(idUserLogin.user.profiles.length!==0)
        {
          console.log("yes");
          localStorage.setItem("nameProfile",response.data.user.profiles)
        }
        else{
          console.log("no");
          localStorage.setItem("nameUser",response.data.user.name)
        }

      console.log(response.data.user.name,"nameeee");
      console.log("idUserLogin", idUserLogin);
      window.location.reload();
    } catch (error) {
      console.log("errorAddCategory", error.response ? error.response.data : error.message);
      setNotexist(true)
      refreshPageAfter3Seconds();
    }
  };

  return (
    <div className="login-container">
      <h2> Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="email">מייל:</label> */}
          {/* <genericInput/> */}
          {/* <input
            // type="text"
            // id="email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          /> */}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            width="100%"
            size="medium"
            style={{ height: '50px', marginBottom: '16px' }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
     
        </div>
        {/* <button type="submit">התחבר</button> */}
        <GenericButton
          className="secondary"
          label="login"
          onClick={formik.handleSubmit}
          // onClick={send()}
          size="medium"
          disabled={formik.isSubmitting}
        />
      {notexist &&  <Alert sx={{width:" 62%", marginTop: "2%",marginLeft:"16%"}} severity="error">User does not exist in the system</Alert>}
      </form>
    </div>
  );
}


export default Login;
