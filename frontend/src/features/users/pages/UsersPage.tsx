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

import { Link } from 'react-router-dom';
import { useLogout } from '../../auth/api';
import { UsersList } from '../components';
import { Button } from '../../../shared/components/ui';

const UsersPage = () => {
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/users"
                className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-blue-600"
              >
                Users
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Profile
              </Link>
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
