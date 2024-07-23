import axiosInstance from '../axios/axios.js';
export const getAllProfiles = async () => {
    try {
        const response = await axiosInstance.get('/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};
export const createProfile = async (profileData) => {
    try {
        const response = await axiosInstance.post('/profiles', profileData);
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};
export const getProfileById = async (id) => {
    try {
        console.log(id,"id");
        const response = await axiosInstance.get(`/profiles/${id}`);
        console.log(response.data,"response.data");
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};
export const getNameProfileById = async (id) => {
    try {
        const response = await axiosInstance.get(`/profiles/userName/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user with id ${id}:`, err);
        throw err;
    }
};
export const updateProfileApi = async (id, profileData) => {
    try {
        const response = await axiosInstance.put(`/profiles/${id}`, profileData);
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};
export const getProfilesByUserId = async (id) => {
    try {
        console.log('2',id)
        const response = await axiosInstance.get(`/profiles/user/${id}`);
        console.log('3',id)
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user ${id}:`, err);
        throw err;
    }
};
export const deleteProfileApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};