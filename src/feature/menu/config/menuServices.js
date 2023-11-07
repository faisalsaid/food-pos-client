import axios from 'axios';
import { apiURI } from '../../../config/environtment';

const stringAPI = `${apiURI}/menu`;

const registerMenu = async (userData, token) => {
  //   console.log(stringAPI);
  //   console.log(userData, token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(stringAPI, userData, config);

  return response.data;
};

const menuServices = {
  registerMenu,
};
export default menuServices;
