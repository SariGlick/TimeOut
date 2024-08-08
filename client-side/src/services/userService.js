import { use } from 'i18next';
import { handleGet, handlePost, handlePut, handleDelete } from '../axios/middleware.js'
const userUrl = `${process.env.REACT_APP_BASE_URL}/users`
export const getAllUser = async() =>{
    try {
        const response =  handleGet(userUrl)
        return response.data;
    } catch (error) {
       console.error('error geting all user',error.message);
         throw error;
    }
 
}
export const getUserById = async(id) =>{
    try {
        const response = handleGet(`${userUrl}/${id}`)
        return (await response).data
    } catch (error) {
        console.error('error getting user by user id',error);
        throw error;
    }
  
}
export const updateUser=(id,user) =>{
    try {
        const response = handlePut(`${userUrl}/${id}`,user)
        return response.data

    } catch (error) {
        console.error('error updating user ', error);
        throw error;
        
    }
}
export const addUser = (user)=>{
    try {
        const response = handlePost(userUrl,user)
        return response.data;
    } catch (error) {
        console.error('error adding user ', error);
        throw error;
        
    }

}
export const  deleteUser = (id) =>{
    try {
        const response = handleDelete(`${userUrl}/${id}`)
        return response.data;
    } catch (error) {
        console.error('error in deleting user');
         throw error;
        
    }

}
