export const MESSAGES = {
    WELCOME_BACK: 'Welcome back',
    SIGNUP_PROMPT: "Don't have an account?",
    INVALID_EMAIL_FORMAT: 'Invalid email format',
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    RECAPTCHA_ERROR: 'Please complete the i am not a robot to proceed.',
    INVALID_EMAIL_PASSWORD: 'Invalid email or password. Please try again.',
    UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
    NETWORK_ERROR: 'Unable to connect to the server. Please check your network connection.',
    SIGNUP_LINK: 'Sign up',
    LOGIN_LABEL: 'Login',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'example@example.com',
    PASSWORD_LABEL: 'Password',
  };
  export const  MessagesSignUp = {
    name: {
      required: 'required field',
      matches: 'The field must contain only letters',
    },
    email: {
      required: 'required field',
      invalid: 'invalid email',
    },
    password: {
      required: 'required field',
      matches: {
        letters: 'field must contain english letter',
        digits: 'field must contain one digit',
      },
      min: 'password must contain at least 4 characters',
      max: 'password must be up to 20 characters',
    },
  };
 export const PASSWORD_STRENGTH = {
    EMPTY: {
      key: 1,
      message: 'Weak password',
      color: 'red'
    },
    WEAK: {
      key: 2,
      message: 'Medium password',
      color: 'orange'
    },
    MEDIUM: {
      key: 3,
      message: 'Strong password',
      color: 'green'
    }
  };
  export const HEADER = {
    edit_user: 'edit user',
    manage_notifications:'manage notifications'
  };
  export const TOAST_MESSAGES = {
    USER_UPDATED_SUCCESS: 'User updated successfully!',
    USER_UPDATED_ERROR: 'Error updating user!',
    USER_UPDATED_ERROR_UNAUTHORIZED: 'Error updating user, Connect to the site and try again',
  }