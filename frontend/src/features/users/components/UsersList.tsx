/**
 * ===== USERS LIST COMPONENT =====
 * 
 * Complete user management interface with pagination and filtering.
 * 
 * Used in: UsersPage.tsx
 * 
 * FEATURES:
 * - Paginated user grid (9 users per page, 3x3 layout)
 * - Age filter dropdown
 * - Loading states (initial + pagination)
 * - Error handling
 * - Empty state
 * - Auto-scroll to top on page change
 * - Shows current page range (e.g., "Showing 1-9 of 45 users")
 * 
 * STATE MANAGEMENT:
 * - page: Current page number (1-based)
 * - ageFilter: Optional age filter
 * - Data from useGetUsers React Query hook
 * 
 * REACT QUERY FEATURES USED:
 * - isLoading: True only on first load
 * - isFetching: True whenever fetching (including pagination)
 * - data: Cached and automatically updated
 * - error: API error handling
 * - placeholderData: Shows old page while loading new one
 * 
 * PAGINATION FLOW:
 * 1. User clicks page number
 * 2. handlePageChange updates state
 * 3. useGetUsers refetches with new page param
 * 4. React Query shows old data while loading (smooth UX)
 * 5. New data replaces old data
 * 6. Page scrolls to top
 * 
 * FILTERING FLOW:
 * 1. User selects age from dropdown
 * 2. handleAgeFilterChange updates ageFilter
 * 3. Reset to page 1 (filter might reduce total pages)
 * 4. useGetUsers refetches with age param
 * 5. Shows filtered results
 * 
 * API PARAMS SENT:
 * - page: Current page (1-based)
 * - limit: 9 users per page
 * - age: Optional age filter
 * - sortBy: 'createdAt' (newest users first)
 * - sortOrder: 'desc'
 * 
 * LOADING STATES:
 * - isLoading && !data: Initial load → show spinner
 * - isFetching && data: Pagination → show "(Loading...)" text
 * - This prevents flickering during pagination
 * 
 * GRID LAYOUT:
 * - 1 column on mobile
 * - 2 columns on tablet (md breakpoint)
 * - 3 columns on desktop (lg breakpoint)
 * 
 * RELATED FILES:
 * - UserCard.tsx: Individual user card component
 * - Pagination.tsx: Pagination controls
 * - api/userHooks.ts: useGetUsers hook
 */

import { useState } from 'react';
import { useGetUsers } from '../api';
import UserCard from './UserCard';
import Pagination from './Pagination';
import { Container, Heading, Text, Label, Alert, SelectInput } from '../../../shared/components/ui';

const UsersList = () => {
  // Local state for pagination and filtering
  const [page, setPage] = useState(1);
  const [ageFilter, setAgeFilter] = useState<number | undefined>(undefined);
  const limit = 9; // 9 cards per page (3x3 grid)

  // React Query hook - automatically refetches when page/ageFilter changes
  const { data, isLoading, isFetching, error } = useGetUsers({
    page,
    limit,
    age: ageFilter,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  /**
   * Handle page navigation
   * Scrolls to top for better UX
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle age filter change
   * Resets to page 1 since filter might reduce total pages
   */
  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAgeFilter(value ? parseInt(value) : undefined);
    setPage(1); // Reset to first page when filter changes
  };

  // Show loading spinner only on initial load (not on pagination changes)
  if (isLoading && !data) {
    return (
      <Container variant="default">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <Text variant="muted" className="mt-4">Loading users...</Text>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container variant="default">
        <Alert variant="error">
          <Text className="font-semibold">Error loading users</Text>
          <Text variant="small" className="mt-1">{(error as any)?.message || 'Failed to fetch users'}</Text>
        </Alert>
      </Container>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Container variant="default">
        <div className="text-center py-12">
          <Text variant="lead" className="text-gray-500">No users found</Text>
          {ageFilter && (
            <button
              onClick={() => setAgeFilter(undefined)}
              className="mt-4 text-blue-500 hover:text-blue-700 underline"
            >
              Clear filter
            </button>
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container variant="default">
      {/* Header with Filter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading variant="h2">
            All Users {isFetching && <Text as="span" variant="small" className="text-gray-500">(Loading...)</Text>}
          </Heading>
          <Text variant="small" className="mt-1">
            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, data.pagination.total)} of{' '}
            {data.pagination.total} users
          </Text>
        </div>

        {/* Age Filter */}
        <div className="flex items-center space-x-3">
          <Label htmlFor="ageFilter" variant="small">Filter by age:</Label>
          <SelectInput
            id="ageFilter"
            value={ageFilter || ''}
            onChange={handleAgeFilterChange}
          >
            <option value="">All ages</option>
            <option value="18">18 years</option>
            <option value="21">21 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
            <option value="35">35 years</option>
            <option value="40">40 years</option>
            <option value="50">50+ years</option>
          </SelectInput>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination.totalPages > 1 && (
        <Pagination pagination={data.pagination} onPageChange={handlePageChange} />
      )}
    </Container>
  );
};

export default UsersList;
