/**
 * Container Component
 * 
 * Flexible container with variant-based styling.
 * Can render as different HTML elements (div, form, section, etc.)
 */

import type { HTMLAttributes, ElementType, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'form' | 'card';
  as?: ElementType;
  children: ReactNode;
}

/**
 * Container Component
 * @param variant - Visual style variant
 * @param as - HTML element to render as (div, form, section, etc.)
 * @param className - Additional CSS classes
 * @param children - Container content
 * @param props - All other HTML attributes
 */
const Container = ({ 
  variant = 'default', 
  as: Component = 'div',
  className = '', 
  children, 
  ...props 
}: ContainerProps) => {
  const variants = {
    default: 'w-full',
    form: 'w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md',
    card: 'w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200',
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

export default Container;
