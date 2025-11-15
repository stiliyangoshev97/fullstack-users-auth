/**
 * User Validation Schemas - Zod
 * 
 * Frontend validation schemas for user profile operations.
 */

import { z } from 'zod';

/**
 * Update user profile schema
 */
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .trim()
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  age: z
    .number()
    .int('Age must be an integer')
    .min(13, 'Age must be at least 13')
    .max(120, 'Age must be at most 120'),
});

// Export types inferred from schemas
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
