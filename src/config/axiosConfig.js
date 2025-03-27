import axios from "axios";
import { getStore  } from "../helper/storeUtils.js";
import { logoutUser } from "../auth/authAPI.js";

const backendUrlUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrlUrl,
  withCredentials: true,
});

// Track refresh state
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

// Axios interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(`${backendUrlUrl}/api/v1/auth/refresh-token`, {}, { withCredentials: true });
        console.log(response.data)
        const { accessToken } = response.data.data;

        // Update headers with the new token
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        onRefreshed(accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        const store=getStore()
        store.dispatch(logoutUser());
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;




// import axios from "axios";
// import { getStore as store } from "../helper/storeUtils.js";
// import { logoutUser } from "../auth/authAPI.js";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;


// const api = axios.create({
//     baseURL: backendUrl,
//     withCredentials: true, // Important for cookies
//   });
  
//   // Axios interceptor for handling token refresh
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         try {
//           // const response = await api.post(`/api/auth/user/refresh`);
//           const response = await axios.post(`${backendUrl}/api/v1/user/refresh-token`, {}, { withCredentials: true });
//           const { accessToken } = response.data.data;
  
//           // Update access token in axios headers
//           api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
  
//           return api(originalRequest);
//         } catch (refreshError) {
//           // Handle refresh token failure (logout user)
//           store.dispatch(logoutUser());
//           return Promise.reject(refreshError);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );

//   export default api;
