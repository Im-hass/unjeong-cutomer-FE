import { basicRequest } from './base';

const SERVICE = '/api/static/store';

export const getStoreInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/store-info`);
  return res;
};

export const getProductInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/product`);
  return res;
};

export const getStoreHolidayInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/holidays`);
  return res;
};
