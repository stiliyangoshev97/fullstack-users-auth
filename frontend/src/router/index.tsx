/**
 * App Router Configuration
 * 
 * Defines all routes for the application using React Router.
 * Includes public routes (login, register) and protected routes (dashboard, profile).
 * 
 * ROUTE TYPES:
 * 1. Public routes - Anyone can access (login, register)
 * 2. Protected routes - Require authentication (dashboard, profile, users)
 * 3. Redirect routes - Auto-redirect (/, *)
 * 
 * HOW PROTECTED ROUTES WORK:
 * - Wrapped in <ProtectedRoute> component
 * - ProtectedRoute checks if user is logged in (reads from Zustand)
 * - If not logged in, redirects to /login
 * - If logged in, renders the page
 * 
 * WHAT IS replace={true}?
 * - Replaces current history entry instead of pushing new one
 * - Prevents back button from returning to redirect routes
 * - Example: User goes to / → redirects to /login → back button doesn't go to /
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../features/auth/pages';
import { DashboardPage, ProfilePage, UsersPage } from '../features/users/pages';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  // ===== ROOT ROUTE =====
  // Redirect root path to login page
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  
  // ===== PUBLIC ROUTES =====
  // Anyone can access these (no authentication required)
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  
  // ===== PROTECTED ROUTES =====
  // Require authentication (user must be logged in)
  // Wrapped in ProtectedRoute which checks isAuthenticated
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    ),
  },
  
  // ===== CATCH-ALL ROUTE =====
  // Wildcard (*) matches any undefined routes
  // Redirects to login (acts as 404 handler)
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
