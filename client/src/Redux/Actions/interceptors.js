import axios from 'axios';

const getLocalToken = () => {
  const token = window.localStorage.getItem('access');
  return token;
};

const getLocalRefresh = () => {
  const refreshToken = window.localStorage.getItem('refresh');
  return refreshToken;
};

export const requestInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${getLocalToken()}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const responseInterceptor = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (
        error.response.status &&
        error.response.status === 403 &&
        error.response.data.error &&
        error.response.data.error.name === 'TokenExpiredError'
      ) {
        try {
          const res = await axios.post('/user/token', {
            token: getLocalRefresh(),
          });
          window.localStorage.setItem('access', res.data.token);
        } catch (err) {
          window.localStorage.removeItem('access');
          window.localStorage.removeItem('refresh');
        }
      }
    }
  );
};
