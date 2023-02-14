import { basicRequest } from './base';

const SERVICE = '/api/static';

export const getStoreInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/store/store-info`);
  return res;
};

export const getProductInfo = async () => {
  const res = await basicRequest.get(`${SERVICE}/store/product`);
  return res;
};
