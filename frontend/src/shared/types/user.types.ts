/**
 * Shared User Types
 * 
 * Central user type definitions used across auth and user features.
 * This replaces the previous IUser and AuthUser duplication.
 */

/**
 * User interface - represents a user in the system
 * Used in: Auth store, user components, API responses
 * 
 * Note: This is the frontend representation of a user.
 * - Dates are strings (from JSON serialization)
 * - No password field (security)
 */
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}
