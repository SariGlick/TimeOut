<<<<<<< HEAD
import axiosInstance from '../axios/axios.js';
=======
import { handleGet, handlePost, handlePut, handleDelete } from '../axios/middleware.js'
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af

export const getAllProfiles = async () => {
    try {
        const response = await handleGet('/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};

export const createProfile = async (profileData) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.post('/profiles', profileData);
=======
        const response = await handlePost('/profiles', profileData);
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};

export const getProfileById = async (id) => {
    try {
        const response = await handleGet(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};


export const updateProfileApi = async (id, profileData) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.put(`/profiles/${id}`, profileData);
=======
        const response = await handlePut(`/profiles/${id}`, profileData);
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};

export const getProfilesByUserId = async (id) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.get(`/profiles/user/${id}`);
=======
        const response = await handleGet(`/profiles/user/${userId}`);
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user ${id}:`, err);
        throw err;
    }
};

export const deleteProfileApi = async (id) => {
    try {
<<<<<<< HEAD
        const response = await axiosInstance.delete(`/profiles/${id}`);
=======
        const response = await handleDelete(`/profiles/${id}`);
>>>>>>> dca0ad0095f7a522b64fa08edd7ce232975626af
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};

