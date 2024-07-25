import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()
const url = process.env.SERVER_URL

export async function get(path) {
    const response = await axios.create({ baseURL: url }).get(path);
    return response;

};

export async function post(path, data) {
    const response = await axios.create({ baseURL: url }).post(path, data);
    return response;

};

export async function put(path, data) {
    const response = await axios.create({ baseURL: url }).put(path, data);
    return response;

};

export async function Delete(path) {
    const response = await axios.create({ baseURL: url }).delete(path);
    return response;

};
