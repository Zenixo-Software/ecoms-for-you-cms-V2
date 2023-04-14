import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  transformRequest: [
    function (data, headers) {
      // If the data is FormData, return it as-is
      if (data instanceof FormData) {
        return data;
      }

      // If the data is a plain object, convert it to JSON
      if (typeof data === 'object') {
        headers['Content-Type'] = 'application/json';
        return JSON.stringify(data);
      }

      // Otherwise, return the data as-is
      return data;
    },
  ],
});

export default instance;
