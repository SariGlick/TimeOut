import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;


export async function handleGet(path) {
    const response = await axios.create({ baseURL: url }).get(path);
    return response;

};

export async function handlePost(path, data) {
    const response = await axios.create({ baseURL: url }).post(path, data);
    return response;

};

export async function handlePut(path, data) {
    const response = await axios.create({ baseURL: url }).put(path, data);
    return response;

};

export async function handleDelete(path) {
    const response = await axios.create({ baseURL: url }).delete(path);
    return response;

};
