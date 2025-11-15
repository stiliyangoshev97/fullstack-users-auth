/**
 * Input Component
 * 
 * Reusable input field with variant-based styling.
 * Supports form and default variants with consistent styling.
 */

import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'form';
  error?: string;
}

/**
 * Input Component
 * @param variant - Visual style variant
 * @param className - Additional CSS classes
 * @param error - Error message to display
 * @param props - All other native input attributes
 */
const Input = ({ 
  variant = 'default', 
  className = '', 
  error,
  ...props 
}: InputProps) => {
  const variants = {
    default: 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150',
    form: 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150',
  };

  const errorClass = error ? 'border-red-500 focus:ring-red-400' : '';

  return (
    <div className="w-full">
      <input
        className={`${variants[variant]} ${errorClass} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
