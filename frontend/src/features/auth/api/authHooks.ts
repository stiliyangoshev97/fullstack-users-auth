/**
 * Auth API Hooks - React Query
 * 
 * Custom hooks for authentication API calls using React Query (TanStack Query).
 * Handles loading states, errors, and automatic cache management.
 * 
 * WHY REACT QUERY FOR API CALLS?
 * - Automatic loading/error/success states (no manual useState needed)
 * - Built-in caching (reduces unnecessary API calls)
 * - Retry logic on failures
 * - Easy refetching and invalidation
 * - Better than useState + useEffect for async operations
 * 
 * WHAT'S useMutation vs useQuery?
 * - useMutation: For write operations (POST/PUT/DELETE) - login, register, update
 * - useQuery: For read operations (GET) - fetch user data, verify token
 * 
 * HOW TO USE THESE HOOKS IN COMPONENTS:
 * const { mutate, isPending, error } = useLogin();
 * mutate({ email, password }); // Triggers the API call
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import * as authApi from './authApi';
import type { 
  LoginCredentials, 
  RegisterUserData,
  ChangePasswordData,
  PasswordResetRequestData,
  PasswordResetData,
} from '../types/auth.types';

/**
 * Login hook
 * 
 * Used in: LoginForm.tsx
 * 
 * What it does:
 * 1. Calls backend /api/auth/login with email + password
 * 2. On success:
 *    - Saves user + token to Zustand store (triggers persist to localStorage)
 *    - Redirects to /dashboard
 * 3. On error:
 *    - Logs error to console
 *    - Error is available in component as `error` property
 * 
 * Returns: { mutate, isPending, error, isSuccess, ... }
 * - mutate: Function to trigger login (mutate({ email, password }))
 * - isPending: true while request is in progress
 * - error: Error object if login failed
 */
export const useLogin = () => {
  const navigate = useNavigate();               // Router navigation
  const setAuth = useAuthStore((state) => state.setAuth); // Zustand action

  return useMutation({
    // The API call function (from authApi.ts)
    mutationFn: (credentials: LoginCredentials) => authApi.loginUser(credentials),
    
    // Success callback (runs after successful API response)
    onSuccess: (data) => {
      // data = { user: {...}, token: "jwt..." } from backend
      
      // Save to Zustand (also saves to localStorage via persist middleware)
      setAuth(data.user, data.token);
      
      // Navigate user to dashboard
      navigate('/dashboard');
    },
    
    // Error callback (runs if API call fails)
    onError: (error: any) => {
      // Log for debugging (error also available in component)
      console.error('Login error:', error);
    },
  });
};

/**
 * Register hook
 * 
 * Used in: RegisterForm.tsx
 * 
 * What it does:
 * 1. Calls backend /api/auth/register with name, email, password, age
 * 2. On success:
 *    - Backend creates user account and returns user + token
 *    - Saves user + token to Zustand store
 *    - Redirects to /dashboard (user is auto-logged in)
 * 3. On error:
 *    - Logs error to console
 *    - Error is available in component (e.g., "Email already exists")
 * 
 * Returns: { mutate, isPending, error, isSuccess, ... }
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    // The API call function (POST /api/auth/register)
    mutationFn: (userData: RegisterUserData) => authApi.registerUser(userData),
    
    // Success: user registered and auto-logged in
    onSuccess: (data) => {
      // Save user + token to Zustand
      setAuth(data.user, data.token);
      // Navigate to dashboard
      navigate('/dashboard');
    },
    
    // Error: registration failed (duplicate email, validation error, etc.)
    onError: (error: any) => {
      console.error('Registration error:', error);
    },
  });
};

/**
 * Logout hook
 * 
 * Used in: DashboardPage.tsx, ProfilePage.tsx (logout button)
 * 
 * What it does:
 * 1. Clears user + token from Zustand store
 * 2. Removes authToken from localStorage
 * 3. Redirects to /login page
 * 
 * Note: No API call needed for logout (JWT is stateless)
 * - Backend doesn't track sessions
 * - Just delete token from frontend
 * 
 * Returns: A function that performs logout
 * Usage: const logout = useLogout(); ... onClick={logout}
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout); // Zustand logout action

  // Return function that components can call
  return () => {
    // Clear auth state (removes token from localStorage)
    logout();
    // Navigate to login page
    navigate('/login');
  };
};

/**
 * Verify token hook
 * Checks if current token is still valid
 */
export const useVerifyToken = () => {
  return useQuery({
    queryKey: ['verifyToken'],
    queryFn: authApi.verifyToken,
    // Only run if user is authenticated
    enabled: !!useAuthStore.getState().token,
    // Don't retry on failure (invalid token should just logout)
    retry: false,
    // Run once on mount
    refetchOnMount: true,
  });
};

/**
 * Change password hook
 * 
 * Used in: ChangePasswordForm.tsx
 * 
 * What it does:
 * - Allows logged-in user to change their password
 * - Requires current password + new password
 * - API call: PATCH /api/auth/change-password
 * 
 * Usage:
 * ```tsx
 * const changePassword = useChangePassword();
 * changePassword.mutate(
 *   { oldPassword: "old123", newPassword: "new456" },
 *   { onSuccess: () => toast.success("Password changed!") }
 * );
 * ```
 * 
 * Parameters:
 * @param data - { oldPassword: string, newPassword: string }
 * 
 * Returns: { mutate, isLoading, error, isSuccess }
 * 
 * NOTE: User stays logged in after password change
 * JWT token remains valid, no re-authentication needed
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => authApi.changePassword(data),
  });
};

/**
 * Request password reset hook
 * 
 * Used in: ForgotPasswordPage.tsx
 * 
 * What it does:
 * - Sends password reset email to user
 * - API call: POST /api/auth/forgot-password
 * - Server generates reset token and emails link
 * 
 * Usage:
 * ```tsx
 * const requestReset = useRequestPasswordReset();
 * requestReset.mutate(
 *   { email: "user@example.com" },
 *   { onSuccess: () => toast.success("Check your email!") }
 * );
 * ```
 * 
 * Parameters:
 * @param data - { email: string }
 * 
 * Returns: { mutate, isLoading, error, isSuccess }
 * 
 * SECURITY NOTE:
 * - Always shows success even if email doesn't exist
 * - Prevents email enumeration attacks
 */
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: PasswordResetRequestData) => authApi.requestPasswordReset(data),
  });
};

/**
 * Reset password hook
 * 
 * Used in: ResetPasswordPage.tsx
 * 
 * What it does:
 * - Resets password using token from email link
 * - API call: POST /api/auth/reset-password
 * - Redirects to login page on success
 * 
 * Usage:
 * ```tsx
 * const resetPassword = useResetPassword();
 * resetPassword.mutate({
 *   token: "reset-token-from-email",
 *   newPassword: "newpass123"
 * });
 * ```
 * 
 * Parameters:
 * @param data - { token: string, newPassword: string }
 * 
 * Returns: { mutate, isLoading, error, isSuccess }
 * 
 * FLOW:
 * 1. User clicks email link with token
 * 2. Page extracts token from URL
 * 3. User enters new password
 * 4. This hook submits token + new password
 * 5. On success, redirects to /login
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordResetData) => authApi.resetPassword(data),
    onSuccess: () => {
      // Redirect to login after successful reset
      // User needs to login with new password
      navigate('/login');
    },
  });
};
