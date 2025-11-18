/**
 * Auth Store - Zustand
 * 
 * Global state management for authentication.
 * Handles user session, token storage, and auth actions.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/auth.types';

interface AuthState {
  // State
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void; // Change only the fields that are updated
}

/**
 * Auth Store
 * 
 * Uses Zustand with persist middleware to save auth state to localStorage.
 * This ensures the user stays logged in even after page refresh.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Set authentication data after login/register
       */
      setAuth: (user, token) => {
        // Also store token separately for axios interceptor
        localStorage.setItem('authToken', token);
        
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      /**
       * Clear authentication data on logout
       */
      logout: () => {
        // Remove token from localStorage
        localStorage.removeItem('authToken');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      /**
       * Update user data (e.g., after profile update)
       */
      updateUser: (updatedFields) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        }));
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      // Only persist user and token, isAuthenticated is derived from token existence
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      // Derive isAuthenticated from token after rehydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Set isAuthenticated based on whether token exists
          state.isAuthenticated = !!state.token;
        }
      },
    }
  )
);
