/**
 * ===== INPUT COMPONENT =====
 * 
 * Reusable input field with consistent styling and error handling.
 * 
 * Used in: LoginForm, RegisterForm, EditProfileForm, ChangePasswordForm
 * 
 * FEATURES:
 * - Consistent styling across all forms
 * - Error message display (from React Hook Form validation)
 * - Red border when error exists
 * - Focus ring for accessibility
 * - Full-width by default
 * - Supports all native input types (text, email, password, number, etc)
 * 
 * ERROR HANDLING:
 * - error prop: String from React Hook Form (e.g., "Email is required")
 * - Automatically shows red border + error text below input
 * - Error text in red, small font, margin-top for spacing
 * 
 * USAGE WITH REACT HOOK FORM:
 * ```tsx
 * const { register, formState: { errors } } = useForm();
 * 
 * <Input
 *   type="email"
 *   placeholder="Enter email"
 *   error={errors.email?.message}
 *   {...register('email')}  // Spreads name, onChange, onBlur, ref
 * />
 * ```
 * 
 * {...register('email')} EXPLAINED:
 * The spread operator passes these props to the input:
 * - name="email"
 * - onChange={handleChange}  (React Hook Form handler)
 * - onBlur={handleBlur}      (For validation on blur)
 * - ref={inputRef}           (React Hook Form needs ref for control)
 * 
 * WHY EXTEND INPUTHTMLATTRIBUTES?
 * - TypeScript knows about type, placeholder, value, onChange, etc
 * - Autocomplete for all native input props
 * - Type safety (can't pass invalid props)
 * 
 * ACCESSIBILITY:
 * - focus:ring-2 for keyboard navigation visibility
 * - Smooth transitions for better UX
 * - Error messages programmatically linked to input
 * 
 * STYLING:
 * - Tailwind CSS classes
 * - Blue ring on focus (normal state)
 * - Red border + red ring on error state
 * - Smooth transitions on state changes
 */

import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'form';
  error?: string; // Error message from validation
}

/**
 * Input Component
 * @param variant - Visual style variant (currently both variants are identical)
 * @param className - Additional CSS classes to merge
 * @param error - Error message from validation (shows below input)
 * @param props - All other native input attributes (type, placeholder, etc)
 */
const Input = ({ 
  variant = 'default', 
  className = '', 
  error,
  ...props // Spread operator: passes all remaining props to <input>
}: InputProps) => {
  // Variant styles (both currently identical, can differentiate later)
  const variants = {
    default: 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150',
    form: 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150',
  };

  // Error styling: red border and red focus ring
  const errorClass = error ? 'border-red-500 focus:ring-red-400' : '';

  return (
    <div className="w-full">
      <input
        className={`${variants[variant]} ${errorClass} ${className}`}
        {...props} // Spread all other props (type, placeholder, name, onChange, etc)
      />
      {/* Show error message below input if error exists */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
