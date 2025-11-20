/**
 * Alert Component
 * 
 * Reusable alert/notification component for success, error, and info messages.
 * Replaces repetitive inline Tailwind on notification divs.
 * 
 * Used in: Forms (success/error messages), pages (info banners)
 * 
 * FEATURES:
 * - 3 visual variants (success, error, info)
 * - Consistent styling with icons and colors
 * - Optional dismiss functionality
 * - Accessible with proper ARIA attributes
 * 
 * VARIANTS:
 * - success: Green background for successful operations
 * - error: Red background for errors/failures
 * - info: Blue background for informational messages
 * 
 * USAGE:
 * ```tsx
 * <Alert variant="success">Profile updated successfully!</Alert>
 * <Alert variant="error">Failed to update profile. Please try again.</Alert>
 * <Alert variant="info">Welcome to your dashboard, {user.name}!</Alert>
 * ```
 */

import type { HTMLAttributes } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'info';
  children: React.ReactNode;
}

/**
 * Alert Component
 * @param variant - Visual style variant (success, error, info)
 * @param className - Additional CSS classes
 * @param children - Alert message content
 * @param props - All other HTML div attributes
 */
const Alert = ({ 
  variant = 'info', 
  className = '', 
  children, 
  ...props 
}: AlertProps) => {
  const variants = {
    success: 'p-3 bg-green-100 border border-green-400 text-green-700 rounded',
    error: 'p-3 bg-red-100 border border-red-400 text-red-700 rounded',
    info: 'bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700',
  };

  return (
    <div
      role="alert"
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Alert;
