/**
 * ===== REACT QUERY PROVIDER =====
 * 
 * Configures and provides React Query (TanStack Query) to the entire app.
 * Handles API state management, caching, and background refetching.
 * 
 * Used in: main.tsx (wraps entire app)
 * 
 * WHAT IS REACT QUERY?
 * - Library for fetching, caching, and updating server state
 * - Automatically manages loading/error states
 * - Smart caching reduces unnecessary API calls
 * - Background refetching keeps data fresh
 * - Optimistic updates for instant UI feedback
 * 
 * WHY USE IT?
 * - Eliminates boilerplate (no manual loading/error state)
 * - Better UX with automatic retries and caching
 * - Works with useQuery (GET) and useMutation (POST/PUT/DELETE)
 * - DevTools for debugging API calls (optional)
 * 
 * CONFIGURATION EXPLAINED:
 * 
 * QUERIES (GET requests):
 * - refetchOnWindowFocus: false
 *   → Don't auto-refetch when user returns to tab
 *   → Reduces API load, data rarely changes
 * 
 * - retry: 1
 *   → If request fails, retry once before giving up
 *   → Good balance between reliability and speed
 * 
 * - staleTime: 5 minutes
 *   → Data is considered "fresh" for 5 minutes
 *   → Won't refetch if accessed within this window
 *   → Reduces redundant API calls
 * 
 * - gcTime: 10 minutes (formerly cacheTime)
 *   → Keep unused data in memory for 10 minutes
 *   → Instant display if user navigates back
 *   → Cleared after 10 minutes to save memory
 * 
 * MUTATIONS (POST/PUT/DELETE):
 * - retry: 1
 *   → Retry failed mutations once
 *   → Prevents data loss from temporary network issues
 * 
 * RELATED FILES:
 * - features/auth/api/authHooks.ts: useLogin, useRegister
 * - features/users/api/userHooks.ts: useGetUsers, useUpdateUser
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

/**
 * Query client configuration
 * Single instance shared across entire app
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch data when window regains focus
      // User data rarely changes, reduces server load
      refetchOnWindowFocus: false,
      
      // Retry failed requests once before giving up
      // Handles temporary network issues gracefully
      retry: 1,
      
      // Cache data is "fresh" for 5 minutes
      // Won't refetch if data accessed within this time
      staleTime: 5 * 60 * 1000,
      
      // Keep unused data in cache for 10 minutes
      // Instant navigation back to previously viewed data
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      // Retry failed mutations once
      // Prevents data loss from temporary failures
      retry: 1,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Query Provider Component
 * Wraps the app with React Query context
 * 
 * All child components can now use:
 * - useQuery() for GET requests
 * - useMutation() for POST/PUT/DELETE
 * - useQueryClient() to access cache
 */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
