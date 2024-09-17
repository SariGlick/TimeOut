import { handlePost } from '../axios/middleware';

export const createUser = async (userData) => {
  try {
    console.log('Sending data to create user:', userData);
    const response = await handlePost('/users', userData);
    return response.data;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

export const login = async (userData) => {
  try {
    console.log('Sending data to login:', userData);
    const response = await handlePost('/users/signIn', userData);
    return response.data;
  } catch (err) {
    console.error('Error login user:', err);
    throw err;
  }
};
