import React from 'react';
import axios from 'axios';
import './login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Alert, Button } from '@mui/material';
import GenericButton from '../../stories/Button/GenericButton';
import GenericInput from '../../stories/GenericInput/genericInput';
import { useNavigate } from 'react-router-dom';
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('required field'),
  password: Yup.string()
    .required('required field')
});

function Login() {
  // const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isNotExists,setIsNotExists]=useState(false)
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      const user = { email: values.email, password: values.password };
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
      const currentUser = await axios.post('http://localhost:5004/users/signIn', {
        email: user.email,
        password: user.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const UserLogin = currentUser.data;
      localStorage.setItem("accessToken", currentUser.data.token);
      if(UserLogin.user.profiles.length!==0)
        {
          localStorage.setItem("nameProfile",currentUser.data.user.profiles)
        }
        else{
          localStorage.setItem("nameUser",currentUser.data.user.name)
        }
        // navigate('/home')
      window.location.reload();
    } catch (error) {

      setIsNotExists(true)
      refreshPageAfter3Seconds();
    }
  };

  return (
    <div className="login-container">
      <h2> Login</h2>
      <form onSubmit={formik.handleSubmit}>
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
          
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
     
        </div>
        <GenericButton
          className="secondary"
          label="login"
          onClick={formik.handleSubmit}
          size="medium"
          disabled={formik.isSubmitting}
        />
      {isNotExists
      
      &&  <Alert sx={{width:" 62%", marginTop: "2%",marginLeft:"16%",textAlign:"center"}} severity="error">user or password not exists or server is down</Alert>}
      </form>
    </div>
  );
}


export default Login;
