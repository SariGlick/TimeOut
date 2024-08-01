export const getUserByGoogleAccount = async (token, email) => {
    try {
      const response = await axiosInstance.get(`/api/users/${token}/${email}`);
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user by Google account:', error);
      throw error; 
    }
  };
  
