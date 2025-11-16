/**
 * User API Hooks - React Query
 * 
 * Custom hooks for user API calls using React Query.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/store';
import * as userApi from './userApi';
import type { UpdateUserData, UserQueryParams } from '../types/user.types';

/**
 * Get current user hook
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: userApi.getCurrentUser,
    // Only run if user is authenticated
    enabled: !!useAuthStore.getState().token,
  });
};

/**
 * Get all users with pagination hook
 */
export const useGetUsers = (params: UserQueryParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getUsers(params),
    // Keep previous data while fetching new page (only if successful)
    placeholderData: (previousData, previousQuery) => {
      // Only use placeholder if the previous query was successful
      return previousQuery?.state.status === 'success' ? previousData : undefined;
    },
    staleTime: 5000, // Consider data fresh for 5 seconds
    retry: 1, // Retry once on failure
  });
};

/**
 * Update current user hook
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const updateUserStore = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (data: UpdateUserData) => {
      if (!user?.id) throw new Error('User not found');
      return userApi.updateCurrentUser(user.id, data);
    },
    onSuccess: (updatedUser) => {
      // Update the user in Zustand store
      updateUserStore(updatedUser);
      // Invalidate and refetch current user query
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

/**
 * Delete current user hook
 */
export const useDeleteUser = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => {
      if (!user?.id) throw new Error('User not found');
      return userApi.deleteCurrentUser(user.id);
    },
    onSuccess: () => {
      // Logout user after account deletion
      logout();
    },
  });
};
