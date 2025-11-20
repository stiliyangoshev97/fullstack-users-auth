/**
 * User API Service
 * 
 * API functions for user endpoints.
 * These are the raw API calls used by React Query hooks.
 */

import { apiClient } from '../../../shared/api';
import type { User } from '../../../shared/types';
import type { UserQueryParams, PaginatedUsersResponse } from '../types/user.types';
import type { UpdateUserData } from '../schemas/user.schemas';
import type { ApiResponse } from '../../../shared/types';

/**
 * Get current user profile from auth
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/api/auth/me');
  return response.data.data;
};

/**
 * Get all users with pagination
 */
export const getUsers = async (params: UserQueryParams = {}): Promise<PaginatedUsersResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.age) queryParams.append('age', params.age.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.search) queryParams.append('search', params.search);
  
  const queryString = queryParams.toString();
  const url = `/api/users${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.get<PaginatedUsersResponse>(url);
  return response.data;
};

/**
 * Update current user profile
 * Note: Backend requires user ID in URL, we get it from auth store
 */
export const updateCurrentUser = async (userId: string, data: UpdateUserData): Promise<User> => {
  const response = await apiClient.put<ApiResponse<User>>(`/api/users/${userId}`, data);
  return response.data.data;
};

/**
 * Delete current user account
 */
export const deleteCurrentUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/api/users/${userId}`);
};
