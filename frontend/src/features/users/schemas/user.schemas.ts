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

// ===== EXPORTED TYPES (Zod-inferred - Single Source of Truth) =====

/**
 * User update data - fields that can be updated
 * Used in: EditProfileForm, userApi.updateCurrentUser
 */
export type UpdateUserData = z.infer<typeof updateUserSchema>;

// Legacy type name for backward compatibility (if needed during refactor)
export type UpdateUserFormData = UpdateUserData;
