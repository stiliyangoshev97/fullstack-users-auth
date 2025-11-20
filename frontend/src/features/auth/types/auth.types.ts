/**
 * Authentication API Response Types
 * 
 * Types for API responses that are NOT form data.
 * Form data types are now inferred from Zod schemas in auth.schemas.ts
 * 
 * REFACTORING NOTE:
 * - Removed: RegisterUserData, LoginCredentials, ChangePasswordData, etc.
 *   (Now exported from auth.schemas.ts as Zod-inferred types)
 * - Removed: AuthUser (replaced with shared/types/user.types.ts User)
 * - Kept: API response types (AuthResponse, TokenVerifyResponse)
 */

import type { User } from '../../../shared/types';

/**
 * Authentication response from login/register
 * Returned by: authApi.loginUser, authApi.registerUser
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Token verification response
 * Returned by: authApi.verifyToken
 */
export interface TokenVerifyResponse {
  valid: boolean;
  user?: User;
}
