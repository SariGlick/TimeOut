import axiosInstance from '../axios/axios.js';

export const getAllWebsites = async () => {
    try {
        const response = await axiosInstance.get('/websites');
        return response.data;
    } catch (err) {
        console.error('Error getting all websites:', err);
        throw err;
    }
};

export const getWebsiteById = async (id) => {
    try {
        const response = await axiosInstance.get(`/websites/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting website with id ${id}:`, err);
        throw err;
    }
};

export const createWebsite = async (websiteData) => {
    try {
        const response = await axiosInstance.post('/websites', websiteData);
        return response.data;
    } catch (err) {
        console.error('Error creating website:', err);
        throw err;
    }
};

export const updateWebsite = async (id, websiteData) => {
    try {
        const response = await axiosInstance.put(`/websites/${id}`, websiteData);
        return response.data;
    } catch (err) {
        console.error(`Error updating website with id ${id}:`, err);
        throw err;
    }
};

export const deleteWebsite = async (id) => {
    try {
        const response = await axiosInstance.delete(`/websites/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error deleting website with id ${id}:`, err);
        throw err;
    }
};
