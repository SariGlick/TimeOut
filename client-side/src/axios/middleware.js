import axiosInstance from './axiosInstance';

export async function handleGet(path, config = {}) {
    const response = await axiosInstance.get(path, config);
    return response;
};

export async function handlePost(path, data, config = {}) {
    const response = await axiosInstance.post(path, data, config);
    return response;
};

export async function handlePut(path, data, config = {}) {
    const response = await axiosInstance.put(path, data, config);
    return response;
};

export async function handleDelete(path, config = {}) {
    const response = await axiosInstance.delete(path, config);
    return response;
};
