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
import { Avatar, Heading, Text } from '../../../shared/components/ui';

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

  const joinDate = formatDate(user.createdAt);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header with avatar and age badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar with user initials */}
          <Avatar name={user.name} size="md" />

          {/* User name and email */}
          <div>
            <Heading variant="h3">{user.name}</Heading>
            <Text variant="small">{user.email}</Text>
          </div>
        </div>

        {/* Age badge */}
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {user.age} years
        </div>
      </div>

      {/* Footer with join date */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
        <span>Joined {joinDate}</span>
      </div>
    </div>
  );
};

export default UserCard;
