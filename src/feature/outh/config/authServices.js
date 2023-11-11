import axios from 'axios';
import { apiURI } from '../../../config/environtment';

// Register user
const registerUser = async (userData) => {
  console.log('registerUser', userData);
  const response = await axios.post(`${apiURI}/auth/signup`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${apiURI}/auth/signin`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// google oauth

const googleOAuth = async (userData) => {
  console.log(userData);
  const response = await axios.post(`${apiURI}/auth/google`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authServices = {
  registerUser,
  login,
  googleOAuth,
};

export default authServices;
