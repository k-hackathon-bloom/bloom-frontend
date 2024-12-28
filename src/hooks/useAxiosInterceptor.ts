import { useEffect, useCallback } from 'react';
import {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigate from '@hooks/useNavigate';

interface AuthorizationErrorResponse {
  errorCode: string;
  message: string;
}

interface AuthorizationError extends AxiosError {
  response?: AxiosResponse<AuthorizationErrorResponse>;
}

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const { navigateTo } = useNavigate();

  const handleRequest = useCallback(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const newConfig = { ...config };

      if (accessToken && newConfig.headers) {
        newConfig.headers.Authorization = `${accessToken}`;
      }

      return newConfig;
    },
    [],
  );

  const handleResponse = useCallback((response: AxiosResponse) => {
    return response;
  }, []);

  const handleError = useCallback(
    async (error: AuthorizationError) => {
      const { response } = error;

      if (response && response.data) {
        const { errorCode } = response.data;

        if (errorCode === 'T2' || errorCode === 'T4') {
          navigateTo('Login');
          return Promise.reject(error);
        }

        if (errorCode === 'T1' || errorCode === 'T3') {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await instance.post('/api/auth/refresh', {
                refreshToken,
              });
              const newAccessToken = refreshResponse.data.accessToken;
              await AsyncStorage.setItem('accessToken', newAccessToken);

              if (error.config) {
                const newConfig = { ...error.config };
                newConfig.headers = newConfig.headers || {};
                newConfig.headers.Authorization = newAccessToken;
                return instance(newConfig);
              }
            } catch (refreshError) {
              navigateTo('Login');
              return Promise.reject(refreshError);
            }
          }
        }
      }

      return Promise.reject(error);
    },
    [navigateTo, instance],
  );

  const setupInterceptors = useCallback(() => {
    const requestInterceptor = instance.interceptors.request.use(
      handleRequest,
      handleError,
    );
    const responseInterceptor = instance.interceptors.response.use(
      handleResponse,
      handleError,
    );

    return { requestInterceptor, responseInterceptor };
  }, [instance, handleRequest, handleResponse, handleError]);

  const ejectInterceptors = useCallback(
    (requestInterceptor: number, responseInterceptor: number) => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    },
    [instance],
  );

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors();

    return () => {
      ejectInterceptors(requestInterceptor, responseInterceptor);
    };
  }, [instance, setupInterceptors, ejectInterceptors]);
};

export default useAxiosInterceptor;
