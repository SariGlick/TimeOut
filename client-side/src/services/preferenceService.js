import { handleGet, handlePost, handlePut, handleDelete } from '../axios/middleware.js';

const preferenceUrl = `${process.env.REACT_APP_BASE_URL}/preferences`;

/**
 * Fetch all preferences.
 * @returns {Promise<Object[]>} A promise that resolves to the list of preferences.
 */
export const getAllPreferences = async () => {
    try {
        const response = await handleGet(preferenceUrl);
        return response.data;
    } catch (err) {
        console.error('Error getting all preferences:', err);
        throw err;
    }
};

/**
 * Fetch a single preference by ID.
 * @param {string} id - The ID of the preference.
 * @returns {Promise<Object>} A promise that resolves to the preference.
 */
export const getPreferenceById = async (id) => {
    try {
        const response = await handleGet(`${preferenceUrl}/${id}`);
        return response.data;
    } catch (err) {
        console.error(`Error getting preference with id ${id}:`, err);
        throw err;
    }
};

/**
 * Create a new preference.
 * @param {Object} preferenceData - The data for the new preference.
 * @returns {Promise<Object>} A promise that resolves to the created preference.
 */
export const createPreference = async (preferenceData) => {
    try {
        const response = await handlePost(preferenceUrl, preferenceData);
        return response.data;
    } catch (err) {
        console.error('Error creating preference:', err);
        throw err;
    }
};

/**
 * Update an existing preference.
 * @param {string} id - The ID of the preference to update.
 * @param {Object} preferenceData - The data to update the preference with.
 * @returns {Promise<Object>} A promise that resolves to the updated preference.
 */
export const updatePreference = async (id, preferenceData) => {
    try {
        const response = await handlePut(`${preferenceUrl}/${id}`, preferenceData);
        return response.data;
    } catch (err) {
        console.error(`Error updating preference with id ${id}:`, err);
        throw err;
    }
};

/**
 * Delete a preference by ID.
 * @param {string} id - The ID of the preference to delete.
 * @returns {Promise<void>} A promise that resolves when the preference is deleted.
 */
export const deletePreference = async (id) => {
    try {
        await handleDelete(`${preferenceUrl}/${id}`);
    } catch (err) {
        console.error(`Error deleting preference with id ${id}:`, err);
        throw err;
    }
};
