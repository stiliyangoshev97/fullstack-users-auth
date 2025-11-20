/**
 * User API Hooks - React Query
 * 
 * Custom hooks for user API calls using React Query.
 * 
 * HOOKS PROVIDED:
 * - useCurrentUser: Fetch logged-in user data (GET /api/auth/me)
 * - useGetUsers: Fetch paginated users list (GET /api/users)
 * - useUpdateUser: Update profile (PUT /api/users/:id)
 * - useDeleteUser: Delete account (DELETE /api/users/:id)
 * 
 * NOTE: Password-related hooks are in features/auth/api/authHooks.ts
 * 
 * WHY REACT QUERY FOR USER DATA?
 * - Automatic caching (reduces API calls)
 * - Background refetching (keeps data fresh)
 * - Loading/error states built-in
 * - Easy invalidation after mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/store';
import * as userApi from './userApi';
import type { UserQueryParams } from '../types/user.types';
import type { UpdateUserData } from '../schemas/user.schemas';

/**
 * Get current user hook
 * 
 * Used in: ProfilePage.tsx
 * 
 * What it does:
 * - Fetches current user from GET /api/auth/me
 * - Only runs if user has token (enabled: !!token)
 * - Caches result with key ['currentUser']
 * 
 * Returns: { data: user, isLoading, error, refetch, ... }
 * 
 * Note: Usually not needed since authStore has user data
 * Useful if you need to refetch fresh user data from server
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],              // Cache key
    queryFn: userApi.getCurrentUser,        // API call function
    enabled: !!useAuthStore.getState().token, // Only run if logged in
  });
};

/**
 * Get all users with pagination hook
 * 
 * Used in: UsersPage.tsx, UsersList.tsx
 * 
 * What it does:
 * - Fetches paginated list of users from GET /api/users
 * - Accepts pagination params: { page, limit, search }
 * - Keeps previous data while loading next page (smooth UX)
 * - Auto-refetches in background every 5 seconds
 * 
 * Parameters:
 * @param params - { page?: number, limit?: number, search?: string }
 * 
 * Returns: {
 *   data: { users: User[], pagination: {...} },
 *   isLoading,
 *   error,
 *   refetch
 * }
 * 
 * PAGINATION HANDLING:
 * - queryKey includes params so each page is cached separately
 * - placeholderData keeps old page visible while loading new one
 * - staleTime: 5s means data won't refetch if accessed within 5 seconds
 */
export const useGetUsers = (params: UserQueryParams = {}) => {
  return useQuery({
    queryKey: ['users', params],            // Cache key includes params (page, limit, etc)
    queryFn: () => userApi.getUsers(params), // API call with pagination params
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
 * Update current user profile hook
 * 
 * Used in: EditProfileForm.tsx
 * 
 * What it does:
 * - Updates user profile via PUT /api/users/:id
 * - Updates Zustand store with new data (instant UI update)
 * - Invalidates React Query cache to trigger background refetch
 * 
 * Usage:
 * ```tsx
 * const updateUser = useUpdateUser();
 * updateUser.mutate(
 *   { name: "New Name", email: "new@email.com" },
 *   { onSuccess: () => navigate('/profile') }
 * );
 * ```
 * 
 * Returns: {
 *   mutate: (data: UpdateUserData) => void,
 *   mutateAsync: async (data) => Promise<User>,
 *   isLoading,
 *   error,
 *   isSuccess
 * }
 * 
 * TWO-LEVEL UPDATE STRATEGY:
 * 1. Zustand store updated immediately (optimistic UI)
 * 2. React Query cache invalidated (ensures consistency)
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();                      // Access React Query cache
  const user = useAuthStore((state) => state.user);          // Get current user ID
  const updateUserStore = useAuthStore((state) => state.updateUser); // Zustand updater

  return useMutation({
    mutationFn: (data: UpdateUserData) => {
      if (!user?.id) throw new Error('User not found');
      return userApi.updateCurrentUser(user.id, data);      // API call
    },
    onSuccess: (updatedUser) => {
      // STEP 1: Update Zustand store immediately (optimistic update)
      updateUserStore(updatedUser);
      
      // STEP 2: Invalidate React Query cache
      // This triggers background refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

/**
 * Delete current user account hook
 * 
 * Used in: ProfilePage.tsx (account deletion feature)
 * 
 * What it does:
 * - Deletes user account via DELETE /api/users/:id
 * - Automatically logs user out on success
 * - Clears all auth state and redirects to login
 * 
 * Usage:
 * ```tsx
 * const deleteUser = useDeleteUser();
 * deleteUser.mutate(undefined, {
 *   onSuccess: () => {
 *     // User is logged out automatically
 *     // Redirect handled by logout() in authStore
 *   }
 * });
 * ```
 * 
 * Returns: { mutate, isLoading, error }
 * 
 * WHY AUTO-LOGOUT?
 * - User account no longer exists
 * - JWT token is now invalid
 * - Must clear all auth state to prevent errors
 */
export const useDeleteUser = () => {
  const user = useAuthStore((state) => state.user);    // Get current user ID
  const logout = useAuthStore((state) => state.logout); // Logout function

  return useMutation({
    mutationFn: () => {
      if (!user?.id) throw new Error('User not found');
      return userApi.deleteCurrentUser(user.id);        // API call to delete account
    },
    onSuccess: () => {
      // Logout user after account deletion
      // This clears Zustand state, removes token, and redirects to login
      logout();
    },
  });
};
