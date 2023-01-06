import axios from 'axios';

// baseurl`
export const baseURL = 'http://121.145.206.143:12230';

// 요청
export const basicRequest = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
