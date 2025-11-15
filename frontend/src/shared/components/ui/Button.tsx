/**
 * Button Component
 * 
 * Reusable button with variant-based styling.
 * Supports multiple visual variants and extends all native button attributes.
 */

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'form';
  children: React.ReactNode;
}

/**
 * Button Component
 * @param variant - Visual style variant
 * @param className - Additional CSS classes
 * @param children - Button content
 * @param props - All other native button attributes
 */
const Button = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150 disabled:bg-blue-300 disabled:cursor-not-allowed',
    secondary: 'px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed',
    danger: 'px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-150 disabled:bg-red-300 disabled:cursor-not-allowed',
    form: 'w-full px-5 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-150 font-semibold shadow-md disabled:bg-green-300 disabled:cursor-not-allowed',
  };

  return (
    <button
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
