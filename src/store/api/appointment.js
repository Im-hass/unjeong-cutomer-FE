import { basicRequest } from './base';

const SERVICE = '/api/customer/appointment';

export const getAppointmentTime = async date => {
  const params = { date };
  const res = await basicRequest.get(`${SERVICE}/available`, { params });
  return res;
};

export const addAppointment = async data => {
  const res = await basicRequest.post(SERVICE, data);
  return res;
};
