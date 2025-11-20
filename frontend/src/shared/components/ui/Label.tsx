/**
 * Label Component
 * 
 * Reusable label for form inputs with consistent styling.
 * Replaces repetitive inline Tailwind classes on <label> tags.
 * 
 * Used in: All form components (LoginForm, RegisterForm, EditProfileForm, etc.)
 * 
 * FEATURES:
 * - Consistent typography and spacing
 * - Proper accessibility with htmlFor attribute
 * - Optional variant for different styles
 * - Supports all native label attributes
 * 
 * USAGE:
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" {...register('email')} />
 * 
 * <Label htmlFor="name" variant="small">Name</Label>
 * ```
 */

import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'small';
  children: React.ReactNode;
}

/**
 * Label Component
 * @param variant - Visual style variant
 * @param htmlFor - ID of associated input (for accessibility)
 * @param className - Additional CSS classes
 * @param children - Label text
 * @param props - All other native label attributes
 */
const Label = ({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: LabelProps) => {
  const variants = {
    default: 'block text-gray-700 text-sm font-bold mb-2',
    small: 'block text-sm font-medium text-gray-700',
  };

  return (
    <label
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
