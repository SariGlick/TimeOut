import axios from 'axios';

export const uploadFile = async (url, formdata, request) => {
  let response;
  try {
    if (request === 'post') {
      response = await axios.post(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else if (request === 'put') {
      response = await axios.put(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};