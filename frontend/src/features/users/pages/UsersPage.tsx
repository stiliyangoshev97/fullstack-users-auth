/**
 * ===== USERS PAGE =====
 * 
 * Displays list of all registered users with pagination.
 * Protected route - requires authentication.
 * 
 * Route: /users
 * Protection: ProtectedRoute wrapper in router/index.tsx
 * 
 * FEATURES:
 * - Navigation bar with links to Dashboard, Users, Profile
 * - UsersList component with all functionality:
 *   → Search bar (filter by name/email)
 *   → User cards grid
 *   → Pagination controls
 *   → Loading states
 *   → Error handling
 * - Logout button in nav
 * 
 * DELEGATION PATTERN:
 * This page is a "container" that provides layout/navigation.
 * All user list logic is in UsersList component for:
 * - Better separation of concerns
 * - Reusability (UsersList can be used elsewhere)
 * - Easier testing
 * - Cleaner code organization
 * 
 * DATA FETCHING:
 * - Handled by UsersList component
 * - Uses useGetUsers hook (React Query)
 * - Automatic caching and background refetch
 * - Pagination state managed in UsersList
 * 
 * NAVIGATION:
 * - Dashboard: /dashboard
 * - Users: /users (current, highlighted)
 * - Profile: /profile
 * - Logout: Clears auth, redirects to /login
 * 
 * RELATED FILES:
 * - components/UsersList.tsx: Main list component
 * - components/UserCard.tsx: Individual user card
 * - components/Pagination.tsx: Pagination controls
 * - api/userHooks.ts: useGetUsers hook
 */

import { useLogout } from '../../auth/api';
import { UsersList } from '../components';
import { Button, NavLink } from '../../../shared/components/ui';

const UsersPage = () => {
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-4">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/users" active={true}>Users</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </div>
            <Button variant="danger" onClick={logout} className="text-sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
