
//TODO:לבדוק האם נכון לעשות את זה כאן,  בסרוויס נפרד
//או שנכון יותר בקונטרולר עצמו, כמו כן האם כדאי להוסיף לקונטרולר
//של ההעדפות קבלת ההעדפות לפי מזהה משתמש
//או להשאיר את זה פה
import axiosInstance from '../axios/axios.js';

const getPreferenceByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log(response);
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
        console.log(Messages);
        
        if (Messages.length > countOfMessagees) {
            return Messages.slice(-countOfMessagees); 
        }
        
        return Messages; 
    } catch (err) {
        console.error(`Error getting Messages with id ${id}:`, err);
        throw err;
    }
};


//  export const limitTheMessage = async (userId) => {
//     const countOfMessagees = await getPreferenceByUserId(userId);
//     const messages = await getMessagesByUserId(userId);
//     Messages.push(...messages);
//     while (Messages.length > countOfMessagees) {
//         Messages.shift();
//     }
//     return Messages;
//  }   

// export default limitTheMessage