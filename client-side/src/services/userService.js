import axios from 'axios';
import { handlePost, handlePut } from '../axios/middleware';
const baseURL = process.env.REACT_APP_BASE_URL;
export const createUser = async (userData) => {
    try {
        const response = await handlePost('/users', userData);
        return response.data;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  export const updateUser = async (user, userId) => {
    try {
      const token = getCookie('token');
      const response = await axios.put(`${baseURL}/users/${userId}`,
           user, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
            });
        return response.data;
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
  };
