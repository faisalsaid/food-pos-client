import axios from 'axios';
import { apiURI } from '../../../config/environtment';
import { async } from '@firebase/util';

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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(stringAPI + menuId, config);
  return response.data;
};

// Update Menu
const updateMenu = async (dataMenu, token) => {
  console.log(dataMenu, ' >>>> ', token);
  const { _id, createrdAt, updatedAt, ...rest } = dataMenu;
  console.log(rest);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(stringAPI + _id, rest, config);
  return response.data;
};

const menuServices = {
  registerMenu,
  getAllMenu,
  deleteMenu,
  updateMenu,
};
export default menuServices;
