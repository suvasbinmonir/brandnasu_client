import axios from "axios";
import { baseURL } from "../url/baseURL";

const axiosCommon = axios.create({
  baseURL, // Ensure baseURL is used correctly
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("Axios Base URL:", baseURL);

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
