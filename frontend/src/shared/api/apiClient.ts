/**
 * Axios API Client
 * 
 * Centralized HTTP client with interceptors for:
 * - Adding auth tokens to requests
 * - Handling response errors
 * - Transforming responses
 * 
 * This is the single point where all API calls go through.
 * It automatically:
 * 1. Adds the JWT token to every request (if user is logged in)
 * 2. Handles 401 errors (expired/invalid token) by auto-logout
 * 3. Provides consistent error messages to the UI
 */

import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api.config';
import type { ApiErrorResponse } from '../types';

/**
 * Create axios instance with base configuration
 * 
 * baseURL: All requests will be prefixed with this (http://localhost:3000)
 * timeout: Requests fail after 10 seconds
 * headers: All requests send JSON by default
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL, // From .env -> VITE_API_BASE_URL
  timeout: API_CONFIG.TIMEOUT,  // 10000ms (10 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * 
 * Runs BEFORE every API request.
 * 
 * Purpose: Automatically attach the JWT token to requests
 * 
 * How it works:
 * 1. Read token from localStorage (key: 'authToken')
 * 2. If token exists, add it to request headers as "Authorization: Bearer <token>"
 * 3. Backend will validate this token on protected routes
 * 
 * Why we read from localStorage directly (not Zustand):
 * - Zustand rehydration may be async, localStorage is synchronous
 * - Ensures token is available immediately when axios initializes
 * - authStore.ts writes token to both Zustand AND localStorage for this reason
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (set by authStore.setAuth())
    const token = localStorage.getItem('authToken');
    
    // Attach token to Authorization header if available
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config; // Send modified config to server
  },
  (error) => {
    // If request fails before being sent (rare)
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * 
 * Runs AFTER every API response (or error).
 * 
 * Purpose: Handle errors globally and auto-logout on token expiration
 * 
 * How it works:
 * SUCCESS PATH:
 * - Just return the response as-is
 * 
 * ERROR PATH:
 * 1. Extract user-friendly error message from backend response
 * 2. Check if error is 401 (Unauthorized - token expired/invalid)
 * 3. If 401 on a protected route (NOT login/register):
 *    - Clear all auth data from localStorage
 *    - Redirect user to /login page
 * 4. Return error object that components can display to user
 * 
 * Why check for login/register endpoints:
 * - 401 on /auth/login means "wrong password" - don't logout, just show error
 * - 401 on /api/users means "token expired" - logout and redirect
 */
apiClient.interceptors.response.use(
  (response) => {
    // Success - return response as-is
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Extract user-friendly error message from backend
    const errorMessage = 
      error.response?.data?.message ||  // Backend's custom message
      error.message ||                  // Axios default message
      'An unexpected error occurred';   // Fallback
    
    // Handle 401 Unauthorized (token expired/invalid)
    if (error.response?.status === 401) {
      // Check if this is a login/register attempt
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || 
                             error.config?.url?.includes('/auth/register');
      
      // Only auto-logout if it's NOT a login/register failure
      // (login failures should just show error, not logout)
      if (!isAuthEndpoint) {
        // Clear all authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        
        // Redirect to login page (token expired/invalid)
        window.location.href = '/login';
      }
    }
    
    // Return simplified error object for components to use
    return Promise.reject({
      message: errorMessage,              // User-friendly message
      status: error.response?.status,     // HTTP status code (401, 404, etc.)
      errors: error.response?.data?.errors, // Validation errors from backend
    });
  }
);

export default apiClient;
