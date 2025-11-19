/**
 * Protected Route Component
 * 
 * Wrapper component that protects routes requiring authentication.
 * Redirects to login if user is not authenticated.
 * 
 * HOW IT WORKS:
 * 1. Reads isAuthenticated from Zustand auth store
 * 2. If false (not logged in), redirects to /login
 * 3. If true (logged in), renders the wrapped component
 * 
 * USAGE IN ROUTER:
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 * 
 * WHY NEEDED:
 * - Prevents unauthenticated users from accessing dashboard, profile, etc.
 * - Without this, users could manually navigate to /dashboard without logging in
 * - With this, they're auto-redirected to /login
 * 
 * USED FOR ROUTES:
 * - /dashboard
 * - /profile
 * - /users
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode; // The component to protect (e.g., <DashboardPage />)
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Read authentication status from Zustand store
  // isAuthenticated is derived from token existence (see authStore.ts)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    // replace=true means back button won't return here
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
