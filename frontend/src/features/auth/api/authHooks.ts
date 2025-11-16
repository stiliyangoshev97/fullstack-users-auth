/**
 * Auth API Hooks - React Query
 * 
 * Custom hooks for authentication API calls using React Query.
 * Handles loading states, errors, and automatic cache management.
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
 * Authenticates user and stores token + user data
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.loginUser(credentials),
    onSuccess: (data) => {
      // Store auth data in Zustand
      setAuth(data.user, data.token);
      // Redirect to dashboard
      navigate('/dashboard');
    },
    onError: (error: any) => {
      // Log error for debugging
      console.error('Login error:', error);
    },
  });
};

/**
 * Register hook
 * Creates new user account and logs them in
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (userData: RegisterUserData) => authApi.registerUser(userData),
    onSuccess: (data) => {
      // Store auth data in Zustand
      setAuth(data.user, data.token);
      // Redirect to dashboard
      navigate('/dashboard');
    },
    onError: (error: any) => {
      // Log error for debugging
      console.error('Registration error:', error);
    },
  });
};

/**
 * Logout hook
 * Clears auth data (no API call needed)
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
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
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => authApi.changePassword(data),
  });
};

/**
 * Request password reset hook
 */
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: PasswordResetRequestData) => authApi.requestPasswordReset(data),
  });
};

/**
 * Reset password hook
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PasswordResetData) => authApi.resetPassword(data),
    onSuccess: () => {
      // Redirect to login after successful reset
      navigate('/login');
    },
  });
};
