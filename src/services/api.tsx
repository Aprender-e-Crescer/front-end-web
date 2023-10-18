import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://15.228.170.56:8000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});
