import axios from 'axios';

const axiosApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data.access;
  } catch (error) {
    console.log('Error refreshing access token:', error);
    return null;
  }
};

axiosApi.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosApi.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // Marking request as retried
    const refreshToken = localStorage.getItem('refreshToken');
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosApi(originalRequest); // Retry the original request with new token
    }
  }
  return Promise.reject(error);
});

const verifyToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.log('No access token found');
    return false;
  }

  try {
    const response = await axiosApi.post('api/auth/token/verify/', {
      token: accessToken,
    });
    console.log('Token is valid:', response.data);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    
    return false;
  }
};

export default axiosApi;
export { verifyToken };
