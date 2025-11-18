/**
 * Auth API Service
 * 
 * API functions for authentication endpoints.
 * These are the raw API calls used by React Query hooks.
 */

import { apiClient } from '../../../shared/api';
import type { 
  LoginCredentials, 
  RegisterUserData, 
  AuthResponse,
  ChangePasswordData,
  PasswordResetRequestData,
  PasswordResetData,
  TokenVerifyResponse,
} from '../types/auth.types';
import type { ApiResponse } from '../../../shared/types';

/**
 * Login user
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    '/api/auth/login',
    credentials
  );
  return response.data.data;
};

/**
 * Register new user
 */
export const registerUser = async (userData: RegisterUserData): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    '/api/auth/register',
    userData
  );
  return response.data.data;
};

/**
 * Verify JWT token
 */
export const verifyToken = async (): Promise<TokenVerifyResponse> => {
  const response = await apiClient.post<ApiResponse<TokenVerifyResponse>>(
    '/api/auth/verify-token'
  );
  return response.data.data;
};

/**
 * Change password (requires authentication)
 */
export const changePassword = async (data: ChangePasswordData): Promise<void> => {
  await apiClient.patch('/api/auth/change-password', data);
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (data: PasswordResetRequestData): Promise<void> => {
  await apiClient.post('/api/auth/forgot-password', data);
};

/**
 * Reset password with token
 */
export const resetPassword = async (data: PasswordResetData): Promise<void> => {
  await apiClient.post('/api/auth/reset-password', data);
};
