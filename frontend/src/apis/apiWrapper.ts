import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';

import { handleHttpError } from './errors_api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Helper to get auth headers
const authHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const axiosInstance = createAxiosInstance();

//Global response interceptor to handle errors centrally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      handleHttpError(status, error); // Calls custom switch-case handler
    }
    return Promise.reject(error);
  }
);

export const requestBuilder = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  getAuth: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          ...authHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  postAuth: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          ...authHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  putAuth: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          ...authHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  deleteAuth: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          ...authHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

// ✅ [Unchanged] Fallback local handler for manual try-catch blocks
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'Request failed';
    console.error('Axios Error:', errorMessage);
    throw new Error(errorMessage);
  }
  console.error('Unexpected Error:', error);
  throw new Error('An unexpected error occurred');
};
