/* eslint-disable no-param-reassign */
import axios from 'axios';

import storage from '@/utils/browser/storage';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    app: process.env.NEXT_PUBLIC_APP_KEY,
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = storage.local.getItem('token');

    if (token) {
      config.headers.token = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    return config;
  }
});

export default api;
