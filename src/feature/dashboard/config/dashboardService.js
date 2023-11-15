import axios from 'axios';
import { apiURI } from '../../../config/environtment';

const stringAPI = `${apiURI}/dashboard/`;

const getDashboardData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(stringAPI, config);
  return response.data;
};

const dashboardService = {
  getDashboardData,
};
export default dashboardService;
