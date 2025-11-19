/**
 * ===== BUTTON COMPONENT =====
 * 
 * Reusable button component with consistent styling across the app.
 * 
 * Used in: All pages and forms throughout the app
 * 
 * FEATURES:
 * - 4 visual variants (primary, secondary, danger, form)
 * - Hover effects with transitions
 * - Disabled state styling
 * - Inherits all native button props (onClick, type, disabled, etc)
 * - Custom className support for overrides
 * 
 * VARIANTS:
 * - primary: Blue button for main actions (default)
 * - secondary: Gray button for less important actions
 * - danger: Red button for destructive actions (logout, delete)
 * - form: Green full-width button for form submissions
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * // Primary button
 * <Button onClick={handleClick}>Click Me</Button>
 * 
 * // Form submit button
 * <Button type="submit" variant="form" disabled={isLoading}>
 *   {isLoading ? 'Submitting...' : 'Submit'}
 * </Button>
 * 
 * // Danger button
 * <Button variant="danger" onClick={logout}>Logout</Button>
 * 
 * // With custom classes
 * <Button className="mt-4 text-sm">Custom</Button>
 * ```
 * 
 * ACCESSIBILITY:
 * - Disabled cursor changes to not-allowed
 * - Disabled opacity reduced for visual feedback
 * - All native button attributes supported (aria-*, role, etc)
 * 
 * WHY EXTEND BUTTONHTMLATTRIBUTES?
 * - Gets TypeScript autocomplete for onClick, disabled, type, etc
 * - Ensures type safety for all button props
 * - No need to manually define every prop
 * 
 * STYLING APPROACH:
 * - Tailwind CSS classes
 * - Template strings to combine variant + custom classes
 * - Transition effects for smooth hover
 */

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'form';
  children: React.ReactNode;
}

/**
 * Button Component
 * @param variant - Visual style variant (primary, secondary, danger, form)
 * @param className - Additional CSS classes to merge with variant styles
 * @param children - Button content (text, icons, etc)
 * @param props - All other native button attributes (onClick, disabled, type, etc)
 */
const Button = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props // Spread operator: passes all remaining props to <button>
}: ButtonProps) => {
  // Variant styles using Tailwind CSS
  const variants = {
    primary: 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150 disabled:bg-blue-300 disabled:cursor-not-allowed',
    secondary: 'px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed',
    danger: 'px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-150 disabled:bg-red-300 disabled:cursor-not-allowed',
    form: 'w-full px-5 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-150 font-semibold shadow-md disabled:bg-green-300 disabled:cursor-not-allowed',
  };

  return (
    <button
      className={`${variants[variant]} ${className}`} // Combine variant + custom classes
      {...props} // Spread all other props (onClick, type, disabled, etc)
    >
      {children}
    </button>
  );
};

export default Button;
