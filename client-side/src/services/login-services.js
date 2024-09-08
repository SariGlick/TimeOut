import { handleGet} from '../axios/middleware.js'

export const getUserByGoogleAccount = async (token, email) => {
  try {
      const response = await handleGet(`/users/getUserByGoogleAccount/`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Failed to fetch user by Google account:', error);
      throw error;
  }
};

