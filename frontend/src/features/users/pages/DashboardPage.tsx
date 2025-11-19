/**
 * ===== DASHBOARD PAGE =====
 * 
 * Main landing page after successful login.
 * Protected route - requires authentication.
 * 
 * Route: /dashboard
 * Protection: ProtectedRoute wrapper in router/index.tsx
 * 
 * FEATURES:
 * - Welcome message with user info
 * - Logout button
 * - Quick navigation cards to:
 *   → /users - View all users list
 *   → /profile - Edit profile & change password
 * 
 * DATA SOURCES:
 * - User info from Zustand store (useAuthStore)
 * - No API calls needed (data loaded at login)
 * 
 * UI LAYOUT:
 * - Full-height page with gray background
 * - Centered container with max-width
 * - Grid layout for navigation cards (responsive)
 * - Hover effects on cards for better UX
 * 
 * USER FLOW:
 * 1. User logs in → redirect to /dashboard
 * 2. See welcome message with their info
 * 3. Click "View Users" → go to /users page
 * 4. Click "Go to Profile" → go to /profile page
 * 5. Click "Logout" → clear auth, redirect to /login
 * 
 * RELATED FILES:
 * - router/ProtectedRoute.tsx: Authentication guard
 * - features/auth/store/authStore.ts: User data source
 * - features/auth/api/authHooks.ts: useLogout hook
 */

import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/store';
import { useLogout } from '../../auth/api';
import { Button, Container } from '../../../shared/components/ui';

const DashboardPage = () => {
  // Get current user from Zustand store
  const user = useAuthStore((state) => state.user);
  
  // Logout mutation (clears auth state and redirects)
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Container variant="card" className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Welcome, {user?.name}!
          </h2>
          <p className="text-blue-700">
            Email: {user?.email}
          </p>
          <p className="text-blue-700">
            Age: {user?.age}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/users" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">All Users</h3>
            <p className="text-gray-600 mb-4">View all registered users in the system</p>
            <Button variant="primary">View Users →</Button>
          </Link>

          <Link to="/profile" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
            <p className="text-gray-600 mb-4">Update your profile information and password</p>
            <Button variant="primary">Go to Profile →</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
