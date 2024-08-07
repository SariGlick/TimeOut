import axiosInstance from "./axios";
import Text from "./Text";

export const getUserByGoogleAccount = async (token, email) => {
    try {
      const response = await axiosInstance.get(`/api/users/${token}/${email}`);
      return response.data;
    } catch (error) {
      console.error(Text.failure.GOOGLE_LOGIN_FAILED, error);
      throw error; 
    }
  };

export const getByEmail = async ()=>{
    try{
        const response = await axiosInstance.get('/getByEmail')
        return response.data
    }catch(err){
        console.error(Text.failure.LOGIN_FAILED, err);
    }
}

export const resetPassword = async (email,password)=>{
    try{
        const response = await axiosInstance.put(`/resetPassword/${email}/${password}`)
        return response.data
    }catch(err){
        console.error(Text.failure.ERROR_IN_RESET_PASS, err);
    }
}

export const getCode = async (email,password)=>{
    try{
        const response = await axiosInstance.get(`/getCode/${email}/${password}`)
        return response.data
    }catch(err){
        console.error(Text.failure.ERROR_SENDING_CODE, err);
    }
}

export const googleLogin = async (token, email) => {
    try {
      const response = await axiosInstance.get(`/api/users/${token}/${email}`);
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.error(Text.failure.GOOGLE_LOGIN_FAILED, error);
      throw error; 
    }
  };
  