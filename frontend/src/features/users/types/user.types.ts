/**
 * User API Response Types
 * 
 * Types for API responses and query parameters that are NOT form data.
 * Form data types are now inferred from Zod schemas in user.schemas.ts
 * 
 * REFACTORING NOTE:
 * - Removed: IUser (replaced with shared/types/user.types.ts User)
 * - Removed: UpdateUserData (now exported from user.schemas.ts as Zod-inferred type)
 * - Kept: API response types (PaginatedUsersResponse, PaginationMeta, UserQueryParams)
 */

import type { User } from '../../../shared/types';

/**
 * Query parameters for filtering users
 * Used in: UsersPage, userApi.getUsers
 */
export interface UserQueryParams {
  page?: number;
  limit?: number;
  age?: number;
  sortBy?: 'name' | 'email' | 'age' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

/**
 * Pagination metadata
 * Used in: PaginatedUsersResponse, Pagination component
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated users response
 * Returned by: userApi.getUsers
 */
export interface PaginatedUsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: PaginationMeta;
}
