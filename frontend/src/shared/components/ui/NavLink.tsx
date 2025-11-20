/**
 * NavLink Component
 * 
 * Reusable navigation link component with active state styling.
 * Replaces repetitive inline Tailwind on navigation <Link> elements.
 * 
 * Used in: Navigation bars across all pages (Dashboard, Profile, Users)
 * 
 * FEATURES:
 * - Active state styling with visual indicator
 * - Hover effects
 * - Consistent navigation styling
 * - Built on React Router Link component
 * 
 * USAGE:
 * ```tsx
 * <NavLink to="/dashboard" active={pathname === '/dashboard'}>
 *   Dashboard
 * </NavLink>
 * <NavLink to="/users" active={pathname === '/users'}>
 *   Users
 * </NavLink>
 * <NavLink to="/profile" active={pathname === '/profile'}>
 *   Profile
 * </NavLink>
 * ```
 * 
 * ACTIVE STATE:
 * - Blue text color
 * - Bottom border indicator
 * - No hover effect when active
 */

import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

interface NavLinkProps extends LinkProps {
  active?: boolean;
  children: React.ReactNode;
}

/**
 * NavLink Component
 * @param to - Navigation destination path
 * @param active - Whether this link represents the current page
 * @param className - Additional CSS classes
 * @param children - Link text
 * @param props - All other React Router Link props
 */
const NavLink = ({ 
  to,
  active = false,
  className = '', 
  children, 
  ...props 
}: NavLinkProps) => {
  const baseStyles = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
  const activeStyles = 'text-blue-600 border-b-2 border-blue-600';
  const inactiveStyles = 'text-gray-700 hover:text-blue-600';

  const combinedStyles = `${baseStyles} ${active ? activeStyles : inactiveStyles} ${className}`;

  return (
    <Link
      to={to}
      className={combinedStyles}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
