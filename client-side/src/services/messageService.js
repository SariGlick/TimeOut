import { handleGet, handlePost, handlePut, handleDelete } from '../axios/middleware.js';

const updateMessageStatus = async (message, newReadStatus) => {
  try {
    const response = await handlePut('/messages/updateStatus', {
      id: message.id,
      read: newReadStatus
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

const deleteMessageById = async (messageId) => {
  try {
    const response = await handleDelete(`/messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

export { updateMessageStatus, deleteMessageById };