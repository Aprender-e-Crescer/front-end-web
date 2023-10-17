import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});
