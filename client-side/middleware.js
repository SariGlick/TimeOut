import axios from 'axios';


export default async function get(path) {
    const response = await axios.get(path);
    return response;

};

export default async function post(path) {
    const response = await axios.post(path);
    return response;

};

export default async function put(path) {
    const response = await axios.put(path);
    return response;

};

export default async function Delete(path) {
    const response = await axios.delete(path);
    return response;

};

