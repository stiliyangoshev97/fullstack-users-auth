/**
 * Users Page
 * 
 * Page displaying all registered users with pagination and filtering.
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
