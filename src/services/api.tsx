import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://15.229.5.45:8000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
