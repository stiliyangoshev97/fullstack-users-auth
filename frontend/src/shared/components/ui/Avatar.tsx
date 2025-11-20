/**
 * Avatar Component
 * 
 * Reusable user avatar component displaying initials in a colored circle.
 * Replaces repetitive inline Tailwind on avatar divs.
 * 
 * Used in: UserCard, ProfilePage, navigation bars
 * 
 * FEATURES:
 * - Displays first letter of user's name
 * - Multiple size variants (sm, md, lg)
 * - Consistent styling and colors
 * - Accessible with proper alt text
 * 
 * SIZES:
 * - sm: 40px (w-10 h-10) - For compact views
 * - md: 48px (w-12 h-12) - Default size
 * - lg: 64px (w-16 h-16) - For profile headers
 * 
 * USAGE:
 * ```tsx
 * <Avatar name={user.name} size="sm" />
 * <Avatar name={user.name} size="md" />
 * <Avatar name={user.name} size="lg" />
 * <Avatar name="John Doe" className="mr-2" />
 * ```
 */

import type { HTMLAttributes } from 'react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Avatar Component
 * @param name - User's name (first letter will be displayed)
 * @param size - Size variant (sm, md, lg)
 * @param className - Additional CSS classes
 * @param props - All other HTML div attributes
 */
const Avatar = ({ 
  name,
  size = 'md', 
  className = '', 
  ...props 
}: AvatarProps) => {
  const sizes = {
    sm: 'w-10 h-10 text-base',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizes[size]} bg-blue-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}
      title={name}
      {...props}
    >
      {initial}
    </div>
  );
};

export default Avatar;
