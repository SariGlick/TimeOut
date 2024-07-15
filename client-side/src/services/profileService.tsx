import axios from '../axios/axios.ts';

const API_URL = '/profiles';

export const getAllProfiles = async () => {
    try {
        const response = await axios.get(`/profiles/profiles`);
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};

export const createProfile = async (profileData) => {
    try {
        const response = await axios.post(`${API_URL}/profiles`, profileData);
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};

export const getProfileById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};

export const updateProfile = async (id, profileData) => {
    try {
        const response = await axios.put(`${API_URL}/profiles/${id}`, profileData);
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};

export const deleteProfile = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};
