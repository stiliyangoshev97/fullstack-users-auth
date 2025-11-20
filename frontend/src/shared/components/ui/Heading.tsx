/**
 * Heading Component
 * 
 * Reusable heading component with semantic HTML and consistent styling.
 * Replaces repetitive inline Tailwind on h1, h2, h3, h4 tags.
 * 
 * Used in: All pages (Dashboard, Profile, Users, etc.)
 * 
 * FEATURES:
 * - Semantic HTML (renders correct h1-h6 tag)
 * - Consistent typography hierarchy
 * - Type-safe variants
 * - Supports custom className for overrides
 * 
 * USAGE:
 * ```tsx
 * <Heading variant="h1">Dashboard</Heading>
 * <Heading variant="h2">Welcome, {user.name}</Heading>
 * <Heading variant="h3">Update Your Profile</Heading>
 * <Heading variant="h4" className="mb-2">Section Title</Heading>
 * ```
 * 
 * WHY THIS APPROACH?
 * - Enforces visual hierarchy (h1 > h2 > h3 > h4)
 * - Easy to update all headings globally
 * - Better accessibility (screen readers use heading levels)
 */

import type { HTMLAttributes } from 'react';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  children: React.ReactNode;
}

/**
 * Heading Component
 * @param variant - HTML heading level (h1-h6)
 * @param className - Additional CSS classes
 * @param children - Heading text
 * @param props - All other HTML heading attributes
 */
const Heading = ({ 
  variant = 'h1', 
  className = '', 
  children, 
  ...props 
}: HeadingProps) => {
  const Tag = variant; // Dynamic HTML tag based on variant
  
  const variants: Record<HeadingVariant, string> = {
    h1: 'text-3xl font-bold text-gray-800',
    h2: 'text-xl font-semibold text-gray-800',
    h3: 'text-lg font-semibold text-gray-700',
    h4: 'text-base font-semibold text-gray-700',
    h5: 'text-sm font-semibold text-gray-700',
    h6: 'text-xs font-semibold text-gray-700',
  };

  return (
    <Tag 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
