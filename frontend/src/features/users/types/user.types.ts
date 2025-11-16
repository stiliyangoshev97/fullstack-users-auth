/**
 * User Types
 * 
 * Types for user-related data structures.
 * Matches backend's user.types.ts
 */

/**
 * User interface - represents a user in the system
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * User update data - fields that can be updated
 */
export interface UpdateUserData {
  name?: string;
  age?: number;
}

/**
 * Query parameters for filtering users
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
 */
export interface PaginatedUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
  pagination: PaginationMeta;
}
