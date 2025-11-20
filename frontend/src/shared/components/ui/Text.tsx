/**
 * Text Component
 * 
 * Reusable text/paragraph component with consistent styling.
 * Replaces repetitive inline Tailwind on <p> tags.
 * 
 * Used in: All pages and components with text content
 * 
 * FEATURES:
 * - Consistent text styling variants
 * - Semantic HTML (renders <p> by default)
 * - Can render as different elements (span, div, etc.)
 * - Supports all native HTML attributes
 * 
 * VARIANTS:
 * - body: Regular paragraph text (default)
 * - small: Smaller text (timestamps, captions)
 * - muted: Gray secondary text
 * - lead: Larger intro/emphasis text
 * 
 * USAGE:
 * ```tsx
 * <Text>Regular paragraph text</Text>
 * <Text variant="small">Created on Nov 20, 2025</Text>
 * <Text variant="muted">{user.email}</Text>
 * <Text variant="lead">Welcome to your dashboard!</Text>
 * <Text as="span" variant="small">Inline text</Text>
 * ```
 */

import type { HTMLAttributes, ElementType } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: 'body' | 'small' | 'muted' | 'lead';
  as?: ElementType;
  children: React.ReactNode;
}

/**
 * Text Component
 * @param variant - Visual style variant
 * @param as - HTML element to render as (p, span, div, etc.)
 * @param className - Additional CSS classes
 * @param children - Text content
 * @param props - All other HTML attributes
 */
const Text = ({ 
  variant = 'body', 
  as: Component = 'p',
  className = '', 
  children, 
  ...props 
}: TextProps) => {
  const variants = {
    body: 'text-base text-gray-700',
    small: 'text-sm text-gray-500',
    muted: 'text-gray-600',
    lead: 'text-lg text-gray-700',
  };

  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
