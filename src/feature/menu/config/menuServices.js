import axios from 'axios';
import { apiURI } from '../../../config/environtment';

const stringAPI = `${apiURI}/menu/`;

const registerMenu = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(stringAPI, userData, config);

  return response.data;
};

const getAllMenu = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(stringAPI, config);
  return response.data;
};

// Delete Menu
const deleteMenu = async (menuId, token) => {
  console.log(menuId, ' >>>> ', token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(stringAPI + menuId, config);
  return response.data;
};

const menuServices = {
  registerMenu,
  getAllMenu,
  deleteMenu,
};
export default menuServices;
