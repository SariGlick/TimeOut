import { handleGet, handlePost, handlePut, handleDelete } from '../axios/middleware.js'

export const getAllProfiles = async () => {
    try {
        const response = await handleGet('/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
    }
};

export const createProfile = async (profileData) => {
    try {
        const response = await handlePost('/profiles', profileData);
        return response.data;
    } catch (err) {
        console.error('Error createProfile:', err);
    }
};

export const getProfileById = async (id) => {
    try {
        const response = await handleGet(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error getting  profile:', err);
    }
};


export const updateProfileApi = async (id, profileData) => {
    try {
        const response = await handlePut(`/profiles/${id}`, profileData);
        return response.data;
    } catch (err) {
        console.error('Error  profiles:', err);
    }
};

export const getProfilesByUserId = async (id) => {
    try {
        const response = await handleGet(`/profiles/user/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user ${id}:`, err);
    }
};

export const deleteProfileApi = async (id) => {
    try {
        const response = await handleDelete(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error:', err.response || err.message);
    }
};

