import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://192.168.3.179:8000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});
