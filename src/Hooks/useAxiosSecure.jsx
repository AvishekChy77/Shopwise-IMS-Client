import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://shopwise-server.vercel.app",
});

// Interceptors are registered once; the hook only refreshes these handlers.
// (Registering inside the hook stacked a new pair on every render.)
let handlers = { logOut: null, navigate: null };

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if ((status === 401 || status === 403) && handlers.logOut) {
      await handlers.logOut();
      handlers.navigate?.("/login");
    }
    return Promise.reject(error);
  }
);

// Server error messages are user-facing ("Product limit reached", ...)
export const apiError = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.message || fallback;

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  handlers = { logOut, navigate };
  return axiosSecure;
};

export default useAxiosSecure;
