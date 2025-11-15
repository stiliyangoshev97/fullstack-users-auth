/**
 * Axios API Client
 * 
 * Centralized HTTP client with interceptors for:
 * - Adding auth tokens to requests
 * - Handling response errors
 * - Transforming responses
 */

import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api.config';
import type { ApiErrorResponse } from '../types';

/**
 * Create axios instance with base configuration
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds JWT token to all requests if available
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles errors and token expiration
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      
      // Redirect to login (we'll handle this via Zustand store later)
      window.location.href = '/login';
    }
    
    // Extract error message
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      'An unexpected error occurred';
    
    // Return a more user-friendly error
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      errors: error.response?.data?.errors,
    });
  }
);

export default apiClient;
