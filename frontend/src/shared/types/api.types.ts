/**
 * Shared API Types
 * 
 * Common types used across all API responses from the backend.
 * These match the backend's API response structure.
 */

/**
 * Standard API success response structure
 * Matches backend's ApiResponse type
 */
export interface ApiResponse<T = any> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Standard API error response structure
 * Matches backend's error handling
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
  stack?: string; // Only in development
  timestamp: string;
}

/**
 * Pagination metadata
 * Matches backend's pagination response
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated API response
 * Used for list endpoints with pagination
 */
export interface PaginatedResponse<T> {
  success: true;
  message: string;
  data: T[];
  pagination: PaginationMeta;
  timestamp: string;
}

/**
 * Query parameters for paginated requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}
