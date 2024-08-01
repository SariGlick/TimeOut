import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5003',
});
export default axiosInstance;