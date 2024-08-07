import { handleGet} from '../axios/middleware.js'

export const getUserByGoogleAccount = async (token, email) => {
    try {
      const response = await handleGet(`/getUserByGoogleAccount/${token}/${email}`); 
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user by Google account:', error);
      throw error; 
    }
  };
  
