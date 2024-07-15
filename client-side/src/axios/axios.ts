
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5002', // השתמש ב-http במקום https עבור localhost
});

export default axiosInstance;


