import axios from 'axios';
import { apiURI } from '../../../config/environtment';

const stringAPI = `${apiURI}/purchase/`;

const purchaseOrder = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(stringAPI, userData, config);

  return response.data;
};

const getALlPurchase = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(stringAPI, config);

  return response.data;
};

const purchaseServices = {
  purchaseOrder,
  getALlPurchase,
};
export default purchaseServices;
