/**
 * ===== PROFILE PAGE =====
 * 
 * User profile management page with tabs for editing profile and changing password.
 * Protected route - requires authentication.
 * 
 * Route: /profile
 * Protection: ProtectedRoute wrapper in router/index.tsx
 * 
 * FEATURES:
 * - Navigation bar with links to Dashboard, Users, Profile
 * - User info card (avatar, name, email, join date)
 * - Tab-based interface:
 *   → Edit Profile: Update name, email, age
 *   → Change Password: Update password with current password verification
 * - Logout button in nav
 * 
 * STATE MANAGEMENT:
 * - activeTab: Controls which form is displayed
 * - user: From Zustand store (reactive to updates)
 * 
 * FORMS USED:
 * - EditProfileForm: Updates user profile (name, email, age)
 * - ChangePasswordForm: Changes password (requires current password)
 * 
 * DATA FLOW (Edit Profile):
 * 1. User edits form in EditProfileForm component
 * 2. Form submits → useUpdateUser mutation
 * 3. API updates user in database
 * 4. Zustand store updated (instant UI update)
 * 5. React Query cache invalidated (consistency check)
 * 6. User info card automatically reflects changes
 * 
 * DATA FLOW (Change Password):
 * 1. User enters current + new password
 * 2. Form submits → useChangePassword mutation
 * 3. Backend verifies current password
 * 4. Backend hashes and saves new password
 * 5. Success message shown
 * 6. User stays logged in (JWT still valid)
 * 
 * WHY TAB INTERFACE?
 * - Cleaner UI than showing both forms at once
 * - Separates concerns (profile vs security)
 * - Common pattern users expect
 * 
 * RELATED FILES:
 * - components/EditProfileForm.tsx: Profile editing form
 * - components/ChangePasswordForm.tsx: Password change form
 * - api/userHooks.ts: useUpdateUser mutation
 * - auth/api/authHooks.ts: useChangePassword mutation
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/store';
import { useLogout } from '../../auth/api';
import { Button, Container } from '../../../shared/components/ui';
import { EditProfileForm, ChangePasswordForm } from '../components';

const ProfilePage = () => {
  // Get current user from Zustand (reactive to updates)
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  
  // Tab state: 'profile' or 'password'
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  // Loading state (shouldn't happen as ProtectedRoute checks auth)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Container variant="card">
          <p className="text-gray-600">Loading user data...</p>
        </Container>
      </div>
    );
  }

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
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Users
              </Link>
              <Link
                to="/profile"
                className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-blue-600"
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
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          </div>

        {/* User Info Card */}
        <Container variant="card" className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Container>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <Container variant="card">
          {activeTab === 'profile' ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Update Your Profile</h3>
              <EditProfileForm user={user} />
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Change Your Password</h3>
              <ChangePasswordForm />
            </div>
          )}
        </Container>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
