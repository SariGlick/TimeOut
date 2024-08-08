import axiosInstance from '../axios/axios.js';

const updateMessageStatus = async (message, newReadStatus) => {
  try {
    const response = await axiosInstance.put('/messages/updateStatus', {
      id: message.id,
      read: newReadStatus
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

export { updateMessageStatus };