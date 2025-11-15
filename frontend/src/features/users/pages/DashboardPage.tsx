/**
 * Dashboard Page
 * 
 * Main dashboard page after login (protected route)
 */

import { useAuthStore } from '../../auth/store';
import { useLogout } from '../../auth/api';
import { Button, Container } from '../../../shared/components/ui';

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">View and manage all users in the system</p>
            <Button variant="primary">Coming Soon</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
            <p className="text-gray-600 mb-4">Update your profile information and password</p>
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/profile'}
            >
              Go to Profile
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
