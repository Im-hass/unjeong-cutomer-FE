import { basicRequest } from './base';

const SERVICE = '/api/customer/policy';

export const getPolicyKeyList = async () => {
  const res = await basicRequest.get(`${SERVICE}/policy/keys`);
  return res;
};

export const getDetailPolicyContent = async key => {
  const res = await basicRequest.get(`${SERVICE}/policy/${key}`);
  return res;
};
