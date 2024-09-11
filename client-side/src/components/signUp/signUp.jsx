import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar, useSnackbar } from 'notistack';
// import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import PasswordStrengthMeter from '../signUp/PasswordStrength';
import GenericButton from '../../stories/Button/GenericButton';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import GenericInput from '../../stories/GenericInput/genericInput';
import { MessagesSignUp,TOAST_MESSAGES } from '../../constants';
import { createUser, updateUser } from '../../services/userService';
import { addUser, updateUserDetails } from '../../redux/user/user.slice';
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
function SignUp({ isEditMode = false, onSave }) {
  const [password, setPassword] = useState('');
  const url = process.env.REACT_APP_SITEKEY;
  const dispatch = useDispatch();
  const navigate=useNavigate();
const user = useSelector(state => state.user.currentUser|| {});
const userId =user.id || null;
const formik = useFormik({
    initialValues:{ name: user.name || '', email: user.email || '', password: '' },
    validationSchema: SignUpSchema,
   onSubmit: (values) => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    if (isEditMode) {
      editUser(user);
    } else {
      userSignUp(user);
    }
  },
  });
useEffect(() => {
  if (isEditMode) {
    formik.setValues({ name: user.name || '', email: user.email || '', password: '' });
  }
}, [isEditMode]);

const resetFormValues = () => {
  formik.resetForm({
      values: {
          name: user.name || '',
          email: user.email || '',
          password: ''
      }
  });
};

  const userSignUp = async (user) => {
    try {
      await createUser(user); 
      dispatch(addUser(user));
      navigate('/home');
    } catch (error) {
      console.error("The user is not included in the system");
    }
  };
  const editUser = async (user) => {
    try {
      await updateUser(user,userId); 
      dispatch(updateUserDetails(user));
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_SUCCESS} type="success" />);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_ERROR_UNAUTHORIZED} type="error" />);
      }else{
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.USER_UPDATED_ERROR} type="error" />);
      }
      resetFormValues();
    }
  };
  return (
    <div className="signup-container">
    <h2>{isEditMode ? 'Edit User' : 'Sign Up'}</h2>
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
      {/* <ReCAPTCHA
       sitekey={url}
   
          onChange={(val) => setRobotPass(val)}
   /> */}
        <GenericButton
          className="secondary"
          //
          label={isEditMode ? 'Update' : 'Sign Up'}
          onClick={formik.handleSubmit}
          size="medium"
          disabled={formik.isSubmitting }//|| !robotPass
        />
      </form>
    </div>
  );
}
export default SignUp;