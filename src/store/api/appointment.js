import { basicRequest } from './base';

const SERVICE = '/api/customer/appointment';

export const getAppointmentTime = async date => {
  const params = { date };
  const res = await basicRequest.get(`${SERVICE}/available`, { params });
  return res;
};

// export const getCartMenuData = async (sizeId: number, cartId: number) => {
//   const res = await basicRequest.get(
//     `${MENU_SERVICE}/size/menu/forCart/${sizeId}/${cartId}`,
//   );
//   return res;
// };

// export const getMyMenuData = async (sizeId: number, cartId: number) => {
//   const res = await basicRequest.get(
//     `${MENU_SERVICE}/size/menu/forMyMenu/${sizeId}/${cartId}`,
//   );
//   return res;
// };
