import { basicRequest } from './base';

const SERVICE = '/api/customer/appointment';

export const getAvailableAppointmentTime = async date => {
  const params = { date };
  const res = await basicRequest.get(`${SERVICE}/available`, { params });
  return res;
};

export const addAppointment = async data => {
  const res = await basicRequest.post(SERVICE, data);
  return res;
};

export const getMyAppointmentList = async data => {
  const res = await basicRequest.post(`${SERVICE}/my`, data);
  return res;
};

export const changeAppointment = async (code, data) => {
  const res = await basicRequest.patch(`${SERVICE}/${code}`, data);
  return res;
};

export const cancelAppointment = async code => {
  const res = await basicRequest.delete(`${SERVICE}/${code}`);
  return res;
};
