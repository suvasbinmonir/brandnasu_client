import axios from "axios";
import { baseURL } from "../url/baseURL";

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// let interceptorsInitialized = false;

const useAxiosSecure = () => {

  // if (!interceptorsInitialized) {
  //   interceptorsInitialized = true;
  // }

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
