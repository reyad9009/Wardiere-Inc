import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b10a12-server-side-reyad9009.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
