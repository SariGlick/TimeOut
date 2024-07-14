import axios from "axios";
import axiosInstance from '../axios/axios.ts';

export const getAllProfiles = async () => {
    try {
        const response = await axiosInstance.get('/profiles/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};
export const createProfile = async (profileData) => {
    try {
        const response = await axios.post('/profiles/profiles', profileData);
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};
export const getProfileById = async (id) => {
    try {
        console.log(id,"id");
        
        const response = await axiosInstance.get(`/profiles/profiles/${id}`);
        console.log(response.data,"response.data");
        
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};
export const updateProfile = async (id, profileData) => {
    try {
        const response = await axios.put(`/profiles/profiles/${id}`, profileData);
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};
export const deleteProfile = async (id) => {
    try {
        const response = await axios.delete(`/profiles/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};