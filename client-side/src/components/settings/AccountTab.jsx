import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import GenericInput from '../../stories/GenericInput/genericInput.jsx';
import CONSTANTS from './constantSetting.js';
import PasswordStrengthMeter from '../signUp/PasswordStrength';
import { MessagesSignUp } from '../../constants';
import './account.scss';

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
const AccountTab=({onUpdate,isEditMode = true, onSave,updatedUser})=> {

  const {t:translate} =useTranslation();
  const {LABELS} =CONSTANTS;
  const user = useSelector(state => state.user.currentUser||{});
  const userId =user._id || '66d49dbc7d55dde5372e67f0';
  const url=process.env.REACT_APP_BASE_URL;
  let imagesrc=''

  const [preview, setPreview] = useState();
  const [password, setPassword] = useState('');
 
  const formik = useFormik({
    initialValues:{ name: updatedUser.name || user.name ||'', email: updatedUser.email || user.email ||'', password: '' },
    validationSchema: SignUpSchema,

  });

  useEffect(()=>{
    if(updatedUser?.profileImage)
    {      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(updatedUser.profileImage);
    }
    else if(user?.profileImage)
    {  
      imagesrc=`${url}/uploads/${user.profileImage}`;
      setPreview(imagesrc);
    }   
  },[]);

  const handleFilePicture = (e) => {
    if (e?.target?.files[0]) {
      onUpdate({profileImage:e.target.files[0]});
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }; 

  useEffect(() => {
    if (isEditMode) {
      formik.setValues({ name: user.name || '', email: user.email || '', password: '' });
    }
  }, [isEditMode]);
  
  
  return (
  <div className="center-container">
    <div className='input-warper'>
    <GenericInput 
     type="file" 
     accept="image/*" 
     onChange={handleFilePicture} 
     label={translate(LABELS.UPLOAD_IMAGE)} 
     size='small'
   /> 
  </div>
   
   {preview &&  
     <div className='profile-picture-container'> 
       <img src={preview} alt="Profile Preview" className="profile-picture" />
     </div> 
   }  

   
<div className="signuUp-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
            <GenericInput
            label="user name"
            type="text"
            name="name"
            onChange={(e)=>{ 
              formik.handleChange(e);
              onUpdate({name: e.target.value});
            }
            }
            onBlur={formik.handleBlur}
            value={formik.values.name}
            width="100%"
            size="medium" 
            className ='sign-input'
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errors">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
             <GenericInput
            label="email"
            type="text"
            name="email"
            onChange={(e)=>{ 
              formik.handleChange(e);
              onUpdate({email:e.target.value});
            }
            }   
            onBlur={formik.handleBlur}
            value={formik.values.email}
            width="100%"
            size="medium"
            className ='sign-input'

          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errors">{formik.errors.email}</div>
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
                onUpdate({password:e.target.value});
                setPassword(e.target.value);
              }}
            
            width="100%"
            size="medium"

          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
          <PasswordStrengthMeter  password={password} />
        </div>

      </form>
    </div> 
 </div>
      
  )
};
export default AccountTab

