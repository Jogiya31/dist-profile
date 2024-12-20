import axios from "axios";

// getting global variable from .env file
const API_URL = process.env.REACT_APP_API_URL;

/**
 * create default layout function for api calls
 * here we can customize our authentication/Authorization token
 **/
const axiosClient = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "3EE23A75-E3FA-47B1-AC8B-E7E610569EA1",
    },
  });
};

export default axiosClient;
