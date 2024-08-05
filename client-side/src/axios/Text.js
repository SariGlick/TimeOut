const Text = {
    success: {
        LOGOUT_SUCCESS: 'You have successfully logged out.',
        OPERATION_COMPLETED: 'Operation completed successfully.',
        MATC_PASS: 'Passwords match. Your password has been updated successfully.' 
  
    },
    
    failure: {
        LOGIN_FAILED: 'Error getting user:',
        GOOGLE_LOGIN_FAILED: 'Failed to fetch user by Google account:',
        ERROR_IN_RESET_PASS: 'Error reset password:',
        ERROR_SENDING_CODE: 'Error sending kode to your email:',
        USER_NOT_FOUND: 'User not found',
        WRONG_PASSWORD: "The code you have entered is not correct, try again or re-send the code.",

    },
    
    warning: {
        FILL_ALL_FIELDS: 'Please fill all OTP fields',
        FILE_FORMAT_INVALID: 'The uploaded file format is invalid',
        NUMERIC_VALUE: 'Please enter only numeric values.',
        REQ_PASS:'Password is required',
        REQ_CONFIRM: 'Confirm password is required',
        NOT_MATCH: 'Passwords do not match',
  
    },
    
    info: {
        SYSTEM_MAINTENANCE: 'The system is under maintenance',
        RESET_CODE: "Didn't receive code?",
        SEND_EMAIL: "We've sent the password to your email:"
  
    },
  };
  
  export default Text;
  