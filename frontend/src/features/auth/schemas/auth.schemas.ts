/**
 * Auth Validation Schemas - Zod
 * 
 * Frontend validation schemas for authentication forms.
 * Matches backend validation rules for consistency.
 */

import { z } from 'zod';

/**
 * Register form validation schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .trim()
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address')
    .max(255, 'Email must be at most 255 characters long'),
  
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password must be at most 128 characters long')
    .regex(/^\S+$/, 'Password cannot contain spaces'),
  
  age: z
    .number()
    .int('Age must be an integer')
    .min(13, 'Age must be at least 13')
    .max(120, 'Age must be at most 120'),
});

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address')
    .max(255, 'Email must be at most 255 characters long'),
  
  password: z
    .string()
    .min(1, 'Password is required'),
});

/**
 * Change password validation schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters long')
    .max(128, 'New password must be at most 128 characters long')
    .regex(/^\S+$/, 'Password cannot contain spaces'),
});

/**
 * Password reset request validation schema
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address'),
});

/**
 * Password reset validation schema (with token)
 */
export const passwordResetSchema = z.object({
  token: z
    .string()
    .min(1, 'Reset token is required'),
  
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters long')
    .max(128, 'New password must be at most 128 characters long')
    .regex(/^\S+$/, 'Password cannot contain spaces'),
});

// Export types inferred from schemas
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
