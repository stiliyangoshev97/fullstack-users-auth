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
import { Button, Container, Heading, Text, Alert, NavLink } from '../../../shared/components/ui';

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Heading variant="h1">Dashboard</Heading>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>

        {/* Welcome Message */}
        <Alert variant="info" className="mb-6">
          <Heading variant="h2" className="text-blue-800 mb-2">
            Welcome, {user?.name}! 👋
          </Heading>
          <Text className="text-blue-700">
            Email: {user?.email}
          </Text>
          <Text className="text-blue-700">
            Age: {user?.age}
          </Text>
        </Alert>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Container variant="card">
            <Heading variant="h3" className="mb-2">All Users</Heading>
            <Text variant="muted" className="mb-4">View all registered users in the system</Text>
            <Link to="/users">
              <Button variant="primary">View Users</Button>
            </Link>
          </Container>

          <Container variant="card">
            <Heading variant="h3" className="mb-2">Profile Settings</Heading>
            <Text variant="muted" className="mb-4">Update your profile information and password</Text>
            <Link to="/profile">
              <Button variant="primary">Manage Profile</Button>
            </Link>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
