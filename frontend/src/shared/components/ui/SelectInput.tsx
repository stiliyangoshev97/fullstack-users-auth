/**
 * SelectInput Component
 * 
 * Reusable native select dropdown with consistent styling.
 * Named "SelectInput" to avoid conflicts with react-select library.
 * 
 * Used in: UsersList (age filter), forms with dropdown selections
 * 
 * FEATURES:
 * - Consistent styling with focus states
 * - Error state support (like Input component)
 * - Label integration
 * - Supports all native select attributes
 * 
 * USAGE:
 * ```tsx
 * <SelectInput id="ageFilter" value={age} onChange={handleChange}>
 *   <option value="">All ages</option>
 *   <option value="18">18 years</option>
 *   <option value="25">25 years</option>
 * </SelectInput>
 * 
 * // With error
 * <SelectInput error={errors.country?.message} {...register('country')}>
 *   <option value="">Select country</option>
 *   <option value="us">United States</option>
 * </SelectInput>
 * ```
 * 
 * NOTE: This wraps the native HTML <select> element.
 * For advanced features (search, multi-select, async), use react-select library.
 */

import type { SelectHTMLAttributes } from 'react';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'form';
  error?: string;
  children: React.ReactNode;
}

/**
 * SelectInput Component
 * @param variant - Visual style variant
 * @param className - Additional CSS classes
 * @param error - Error message from validation (shows below select)
 * @param children - <option> elements
 * @param props - All other native select attributes
 */
const SelectInput = ({ 
  variant = 'default', 
  className = '', 
  error,
  children,
  ...props 
}: SelectInputProps) => {
  const variants = {
    default: 'px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150',
    form: 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150',
  };

  // Add error styling if error exists
  const errorStyles = error ? 'border-red-500 focus:ring-red-400' : '';

  return (
    <div className="w-full">
      <select
        className={`${variants[variant]} ${errorStyles} ${className}`}
        {...props}
      >
        {children}
      </select>
      {/* Error message below select */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
