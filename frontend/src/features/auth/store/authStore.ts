/**
 * Auth Store - Zustand
 * 
 * Global state management for authentication.
 * Handles user session, token storage, and auth actions.
 * 
 * WHY ZUSTAND FOR AUTH?
 * - Lightweight (no context/provider boilerplate)
 * - Easy to access anywhere: useAuthStore((state) => state.user)
 * - Built-in persistence (saves to localStorage automatically)
 * - No re-render issues like Context API
 * 
 * WHAT'S STORED:
 * - user: Current user data (id, name, email, age)
 * - token: JWT token for API authentication
 * - isAuthenticated: Derived from token existence (true if token exists)
 * 
 * HOW PERSISTENCE WORKS:
 * - Only user + token are saved to localStorage (key: 'auth-storage')
 * - isAuthenticated is NOT saved (derived on rehydration)
 * - On page reload, Zustand automatically restores user + token
 * - Then onRehydrateStorage sets isAuthenticated = !!token
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/auth.types';

/**
 * Auth state shape and actions
 */
interface AuthState {
  // ===== STATE =====
  user: AuthUser | null;        // Current logged-in user (null if not logged in)
  token: string | null;         // JWT token from backend (null if not logged in)
  isAuthenticated: boolean;     // Derived flag (true if token exists)
  
  // ===== ACTIONS =====
  setAuth: (user: AuthUser, token: string) => void;  // Called after login/register
  logout: () => void;                                 // Clear auth data
  updateUser: (user: Partial<AuthUser>) => void;     // Update user fields (after profile edit)
}

/**
 * Auth Store
 * 
 * Uses Zustand with persist middleware to save auth state to localStorage.
 * This ensures the user stays logged in even after page refresh.
 * 
 * create<AuthState>()(...) - Creates a typed Zustand store
 * persist(...) - Middleware that saves state to localStorage
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ===== INITIAL STATE =====
      // On first load (no saved data), all values start as null/false
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Set authentication data after login/register
       * 
       * Called by: authHooks.ts (useLogin, useRegister) after successful API call
       * 
       * What it does:
       * 1. Saves token to localStorage.authToken (for axios interceptor)
       * 2. Updates Zustand state with user, token, isAuthenticated=true
       * 3. Persist middleware auto-saves to localStorage.auth-storage
       * 
       * Why save token twice (authToken + auth-storage)?
       * - authToken: Read by axios immediately (apiClient.ts)
       * - auth-storage: Zustand's persist key (contains user + token)
       */
      setAuth: (user, token) => {
        // Store token separately for axios interceptor (read in apiClient.ts)
        localStorage.setItem('authToken', token);
        
        // Update Zustand state (triggers UI re-renders)
        set({
          user,                    // Full user object from backend
          token,                   // JWT token string
          isAuthenticated: true,   // Flag for ProtectedRoute checks
        });
      },

      /**
       * Clear authentication data on logout
       * 
       * Called by: authHooks.ts (useLogout) or manually
       * 
       * What it does:
       * 1. Removes authToken from localStorage
       * 2. Resets Zustand state to initial values
       * 3. Persist middleware auto-saves cleared state
       */
      logout: () => {
        // Remove token from localStorage (axios will no longer send it)
        localStorage.removeItem('authToken');
        
        // Reset Zustand state (user now logged out)
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      /**
       * Update user data (e.g., after profile update)
       * 
       * Called by: userHooks.ts (useUpdateUser) after successful profile edit
       * 
       * What it does:
       * - Merges new fields into existing user object
       * - Example: updateUser({ name: "New Name" }) keeps other fields unchanged
       * 
       * Why Partial<AuthUser>?
       * - Allows updating only some fields (name, age) without passing all fields
       * - TypeScript ensures only valid user fields can be updated
       */
      updateUser: (updatedFields) => {
        set((state) => ({
          user: state.user 
            ? { ...state.user, ...updatedFields }  // Merge new fields into existing user
            : null,                                 // If no user, keep null
        }));
      },
    }),
    {
      // ===== PERSISTENCE CONFIG =====
      
      name: 'auth-storage', // localStorage key where state is saved
      
      /**
       * partialize: Choose which parts of state to save
       * 
       * We only save user + token (NOT isAuthenticated)
       * 
       * Why exclude isAuthenticated?
       * - It's derived from token existence (redundant to save it)
       * - Prevents state drift (token and isAuthenticated getting out of sync)
       * - Single source of truth: token determines if user is authenticated
       * 
       * What gets saved to localStorage.auth-storage:
       * { user: {...}, token: "jwt..." }
       */
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        // isAuthenticated NOT included (will be derived)
      }),
      
      /**
       * onRehydrateStorage: Run after loading state from localStorage
       * 
       * Called when: Page reloads and Zustand restores saved state
       * 
       * What it does:
       * - Derives isAuthenticated from token presence
       * - isAuthenticated = true if token exists, false otherwise
       * 
       * Why !!state.token?
       * - Converts token to boolean (null -> false, "jwt..." -> true)
       * - First ! converts to opposite boolean, second ! flips it back
       * 
       * This ensures isAuthenticated always matches token state
       */
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Derive isAuthenticated from token (true if token exists)
          state.isAuthenticated = !!state.token;
        }
      },
    }
  )
);
