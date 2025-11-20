/**
 * ===== USER CARD COMPONENT =====
 * 
 * Displays a single user's information in a card format.
 * 
 * Used in: UsersList.tsx, UsersPage.tsx
 * 
 * FEATURES:
 * - Avatar with first letter of name
 * - User name and email
 * - Age badge
 * - Join date and truncated user ID
 * - Hover effect (shadow grows on hover)
 * 
 * DESIGN:
 * - Card layout with rounded corners and shadow
 * - Responsive spacing with Tailwind CSS
 * - Blue color scheme for consistency
 * - Truncated ID for privacy/readability
 * 
 * Props:
 * @param user - User object with { id, name, email, age, createdAt }
 */

import type { User } from '../../../shared/types';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  /**
   * Format date to readable format
   * Example: "Jan 15, 2024"
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        {/* Age Badge */}
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {user.age} years
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
        <span>Joined: {formatDate(user.createdAt)}</span>
        <span>ID: {user.id.slice(0, 8)}...</span>
      </div>
    </div>
  );
};

export default UserCard;
