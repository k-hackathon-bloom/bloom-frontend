import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    const modifiedConfig = { ...config };
    if (token) {
      modifiedConfig.headers.Authorization = token;
    }
    return modifiedConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
