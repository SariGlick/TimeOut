import axios from 'axios';


export default async function get(path) {
    const response = await axios.get(path);
    return response;

};

export default async function post(path, data) {
    const response = await axios.post(path, data);
    return response;

};

export default async function put(path, data) {
    const response = await axios.put(path, data);
    return response;

};

export default async function Delete(path) {
    const response = await axios.delete(path);
    return response;

};

