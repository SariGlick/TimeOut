// constants.js

const MESSAGES = {
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
  
  export default MESSAGES;
  