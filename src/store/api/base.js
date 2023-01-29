import axios from 'axios';

// baseurl`
export const baseURL = process.env.REACT_APP_BASEURL;

// 요청
export const basicRequest = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
