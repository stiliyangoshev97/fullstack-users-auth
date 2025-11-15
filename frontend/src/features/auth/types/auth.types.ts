/**
 * Authentication Types
 * 
 * Types for authentication-related data structures.
 * Matches backend's auth.types.ts
 */

/**
 * User registration data
 */
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  age: number;
}

/**
 * User login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Password change data
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

/**
 * Password reset request data
 */
export interface PasswordResetRequestData {
  email: string;
}

/**
 * Password reset data with token
 */
export interface PasswordResetData {
  token: string;
  newPassword: string;
}

/**
 * Authentication response from login/register
 */
export interface AuthResponse {
  user: AuthUser;
  token: string;
}

/**
 * Authenticated user data (without sensitive fields)
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Token verification response
 */
export interface TokenVerifyResponse {
  valid: boolean;
  user?: AuthUser;
}
