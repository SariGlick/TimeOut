import axios from '../axios/axios.ts';

const API_URL = '/websites';

export const getAllWebsites = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (err) {
        console.error('Error getting all websites:', err);
        throw err;
    }
};

export const getWebsiteById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting website with id ${id}:`, err);
        throw err;
    }
};

export const updateWebsite = async (id: string, websiteData: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, websiteData);
        return response.data;
    } catch (err) {
        console.error(`Error updating website with id ${id}:`, err);
        throw err;
    }
};

export const addWebsite = async (websiteData: any) => {
    try {
        const response = await axios.post(`${API_URL}`, websiteData);
        return response.data;
    } catch (err) {
        console.error('Error adding new website:', err);
        throw err;
    }
};

export const deleteWebsite = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
        console.error(`Error deleting website with id ${id}:`, err);
        throw err;
    }
};
