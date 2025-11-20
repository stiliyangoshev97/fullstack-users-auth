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
import { useAuthStore } from '../../auth/store';
import { useLogout } from '../../auth/api';
import { Button, Container, Heading, Text, NavLink, Avatar } from '../../../shared/components/ui';
import { EditProfileForm, ChangePasswordForm } from '../components';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Container variant="card">
          <Text variant="muted">Loading user data...</Text>
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
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/users">Users</NavLink>
              <NavLink to="/profile" active={true}>Profile</NavLink>
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
            <Heading variant="h1">Profile Settings</Heading>
          </div>

          {/* User Info Card */}
          <Container variant="card" className="mb-6">
            <div className="flex items-center space-x-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <Heading variant="h2">{user.name}</Heading>
                <Text variant="muted">{user.email}</Text>
                <Text variant="small">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Text>
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
                <Heading variant="h3" className="mb-4">Update Your Profile</Heading>
                <EditProfileForm user={user} />
              </div>
            ) : (
              <div>
                <Heading variant="h3" className="mb-4">Change Your Password</Heading>
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
