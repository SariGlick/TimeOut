import { handlePost } from '../axios/middleware';

export const createUser = async (userData) => {
    try {
        const response = await handlePost('/users', userData);
        return response.data;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};
