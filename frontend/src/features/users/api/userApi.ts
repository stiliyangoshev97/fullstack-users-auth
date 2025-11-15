/**
 * User API Service
 * 
 * API functions for user endpoints.
 * These are the raw API calls used by React Query hooks.
 */

import { apiClient } from '../../../shared/api';
import type { IUser, UpdateUserData } from '../types/user.types';
import type { ApiResponse } from '../../../shared/types';

/**
 * Get current user profile from auth
 */
export const getCurrentUser = async (): Promise<IUser> => {
  const response = await apiClient.get<ApiResponse<IUser>>('/api/auth/me');
  return response.data.data;
};

/**
 * Update current user profile
 * Note: Backend requires user ID in URL, we get it from auth store
 */
export const updateCurrentUser = async (userId: string, data: UpdateUserData): Promise<IUser> => {
  const response = await apiClient.put<ApiResponse<IUser>>(`/api/users/${userId}`, data);
  return response.data.data;
};

/**
 * Delete current user account
 */
export const deleteCurrentUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/api/users/${userId}`);
};
