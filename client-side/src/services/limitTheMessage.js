

import axiosInstance from '../axios/axios.js';

const getPreferenceByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);       
        const countOfMessagees = response.data.preference.countOfMessagees;
        return countOfMessagees;         
         
    } catch (err) {
        console.error('Error getting preference:', err);
        throw err;
    }
};
export  const getLimitMessages = async (id) => {
    try {
        const countOfMessagees = await getPreferenceByUserId(id);
        const response = await axiosInstance.get(`/message/user/${id}`);
        const Messages = response.data;        
        
        if (Messages.length > countOfMessagees) {
            return Messages.slice(-countOfMessagees); 
        }
        
        return Messages; 
    } catch (err) {
        console.error(`Error getting Messages with id ${id}:`, err);
        throw err;
    }
};


