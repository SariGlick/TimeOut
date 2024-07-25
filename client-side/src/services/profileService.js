import {get, post, put, Delete } from '../axios/middleware.js'

export const getAllProfiles = async () => {
    try {
        const response = await get('/profiles');
        return response.data;
    } catch (err) {
        console.error('Error getting all profiles:', err);
        throw err;
    }
};
export const createProfile = async (profileData) => {
    try {
        const response = await post('/profiles', profileData);
        return response.data;
    } catch (err) {
        console.error('Error creating profile:', err);
        throw err;
    }
};
export const getProfileById = async (id) => {
    try {
        const response = await get(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profile with id ${id}:`, err);
        throw err;
    }
};
export const updateProfile = async (id, profileData) => {
    try {
        const response = await put(`/profiles/${id}`, profileData);
        return response.data;
    } catch (err) {
        console.error(`Error updating profile with id ${id}:`, err);
        throw err;
    }
};
export const getProfilesByUserId = async (userId) => {
    try {
        const response = await get(`/profiles/user/${userId}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting profiles for user ${userId}:`, err);
        throw err;
    }
};
export const deleteProfile = async (id) => {
    try {
        const response = await Delete(`/profiles/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting profile with id ${id}:`, err);
        throw err;
    }
};