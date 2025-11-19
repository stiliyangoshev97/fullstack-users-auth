

/**
 * ===== MAIN APP COMPONENT =====
 * 
 * Root component of the entire application.
 * Sets up routing with React Router v6.
 * 
 * RESPONSIBILITIES:
 * - Renders RouterProvider with configured routes
 * - All routes are defined in ./router/index.tsx
 * - Wrapped by QueryProvider in main.tsx for React Query
 * 
 * ROUTE STRUCTURE (from ./router/index.tsx):
 * - Public routes: /login, /register
 * - Protected routes: /dashboard, /profile, /users
 * - Redirect: / → /dashboard
 * 
 * APP INITIALIZATION FLOW:
 * 1. main.tsx renders <App /> inside <QueryProvider>
 * 2. App renders <RouterProvider> with router config
 * 3. Router checks URL and renders matching route
 * 4. ProtectedRoute checks auth before rendering protected pages
 * 5. Zustand auth store rehydrates from localStorage
 * 6. User sees appropriate page based on auth state
 * 
 * WHY SO SIMPLE?
 * - React Router handles all routing logic
 * - Global providers (React Query) wrap this in main.tsx
 * - Auth logic is in router/ProtectedRoute.tsx
 * - Keeps App.tsx clean and focused
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  // Simply render the router - all logic is delegated
  return <RouterProvider router={router} />;
};

export default App;