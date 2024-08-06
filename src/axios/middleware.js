import axios from 'axios';

const url = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function handlePost(path, data) {
    console.log(path,data,"ooo");
    const response = await axios.create({baseURL:url}).post(path,data,
        {
                  headers: {
                     'Content-Type': 'application/json'
                   }
                }
    )
    // const response = await axios.post('http://localhost:5004/users/', data
    //       , {
    //            headers: {
    //          'Content-Type': 'application/json'
    //           }
    //         });
    console.log(response,"respon");
    return response;
}

export async function handleGet(path) {
    const response = await axios.create({ baseURL: url }).get(path);
    return response;

};

// export async function handlePost(path, data) {
//     const response = await axios.create({ baseURL: url }).post(path, data);
//     return response;

// };

export async function handlePut(path, data) {
    const response = await axios.create({ baseURL: url }).put(path, data);
    return response;

};

export async function handleDelete(path) {
    const response = await axios.create({ baseURL: url }).delete(path);
    return response;

};
