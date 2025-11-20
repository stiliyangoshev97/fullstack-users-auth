/**
 * ===== AUTH API SERVICE =====
 * 
 * Raw API functions for authentication endpoints.
 * These are plain async functions called by React Query hooks.
 * 
 * Used by: authHooks.ts (useLogin, useRegister, etc)
 * 
 * ARCHITECTURE:
 * - authApi.ts: Raw API calls (this file)
 * - authHooks.ts: React Query wrappers (useLogin, etc)
 * - Components: Use hooks, not API functions directly
 * 
 * WHY SEPARATE API FROM HOOKS?
 * - Cleaner separation of concerns
 * - API functions can be used outside React (if needed)
 * - Easier to test (mock API functions separately)
 * - React Query logic stays in hooks
 * 
 * API CLIENT:
 * - Uses shared/api/apiClient.ts (axios instance)
 * - Auto-attaches JWT token from localStorage
 * - Auto-handles 401 errors (logout)
 * 
 * RESPONSE STRUCTURE:
 * Backend returns: { success: true, data: {...}, message: "..." }
 * We extract: response.data.data (the actual payload)
 * 
 * ENDPOINTS:
 * - POST /api/auth/login
 * - POST /api/auth/register
 * - POST /api/auth/verify-token
 * - PATCH /api/auth/change-password
 * - POST /api/auth/forgot-password
 * - POST /api/auth/reset-password
 */

import { apiClient } from '../../../shared/api';
import type { 
  AuthResponse,
  TokenVerifyResponse,
} from '../types/auth.types';
import type { 
  LoginCredentials, 
  RegisterUserData, 
  ChangePasswordData,
  PasswordResetRequestData,
  PasswordResetData,
} from '../schemas/auth.schemas';
import type { ApiResponse } from '../../../shared/types';

/**
 * Login user
 * 
 * POST /api/auth/login
 * @param credentials - { email, password }
 * @returns { token, user } on success
 * @throws Error with message on failure
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    '/api/auth/login',
    credentials
  );
  return response.data.data; // Extract payload from wrapper
};

/**
 * Register new user
 * 
 * POST /api/auth/register
 * @param userData - { name, email, password, age }
 * @returns { token, user } on success (auto-logged in)
 * @throws Error if email already exists or validation fails
 */
export const registerUser = async (userData: RegisterUserData): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    '/api/auth/register',
    userData
  );
  return response.data.data; // Extract payload
};

/**
 * Verify JWT token validity
 * 
 * POST /api/auth/verify-token
 * Token sent automatically by apiClient interceptor
 * @returns { user, valid: true } if token is valid
 * @throws Error if token is invalid/expired
 */
export const verifyToken = async (): Promise<TokenVerifyResponse> => {
  const response = await apiClient.post<ApiResponse<TokenVerifyResponse>>(
    '/api/auth/verify-token'
  );
  return response.data.data;
};

/**
 * Change password for logged-in user
 * 
 * PATCH /api/auth/change-password
 * Requires authentication (token in header)
 * @param data - { currentPassword, newPassword }
 * @throws Error if current password is wrong
 */
export const changePassword = async (data: ChangePasswordData): Promise<void> => {
  await apiClient.patch('/api/auth/change-password', data);
};

/**
 * Request password reset email
 * 
 * POST /api/auth/forgot-password
 * Sends email with reset token link
 * @param data - { email }
 * Note: Always returns success (prevents email enumeration)
 */
export const requestPasswordReset = async (data: PasswordResetRequestData): Promise<void> => {
  await apiClient.post('/api/auth/forgot-password', data);
};

/**
 * Reset password using token from email
 * 
 * POST /api/auth/reset-password
 * @param data - { token, newPassword }
 * @throws Error if token is invalid/expired
 */
export const resetPassword = async (data: PasswordResetData): Promise<void> => {
  await apiClient.post('/api/auth/reset-password', data);
};
