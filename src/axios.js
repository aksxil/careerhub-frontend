// src/utils/axios.js

import axios from "axios";

const BACKENDS = [
  import.meta.env.VITE_API_URL_1,
  import.meta.env.VITE_API_URL_2,
];

let activeBackend = null;

const getActiveBackend = async () => {
  // Agar pehle se working backend mil chuka hai
  if (activeBackend) {
    return activeBackend;
  }

  // Dono backends ko check karo
  for (const url of BACKENDS) {
    if (!url) continue;

    try {
      const response = await axios.get(`${url}/`, {
        timeout: 5000,
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Active Backend:", url);

        activeBackend = url;

        return url;
      }
    } catch (error) {
      console.log("Backend unavailable:", url);
    }
  }

  throw new Error("No backend server is available");
};

const instance = axios.create({
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Har request se pehle active backend determine hoga
instance.interceptors.request.use(async (config) => {
  const backend = await getActiveBackend();

  config.baseURL = backend;

  return config;
});

// Agar currently selected backend request ke time down ho jaye
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Request fail hui aur pehle retry nahi hua
    if (
      !error.response &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Current backend ko reset karo
      activeBackend = null;

      try {
        // Doosra working backend find karo
        const newBackend = await getActiveBackend();

        originalRequest.baseURL = newBackend;

        return instance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;