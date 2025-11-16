/**
 * Users List Component
 * 
 * Displays a paginated grid of user cards with filtering options.
 */

import { useState } from 'react';
import { useGetUsers } from '../api';
import UserCard from './UserCard';
import Pagination from './Pagination';
import { Container } from '../../../shared/components/ui';

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [ageFilter, setAgeFilter] = useState<number | undefined>(undefined);
  const limit = 9; // 9 cards per page (3x3 grid)

  const { data, isLoading, isFetching, error } = useGetUsers({
    page,
    limit,
    age: ageFilter,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container variant="default">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error loading users</p>
          <p className="text-sm mt-1">{(error as any)?.message || 'Failed to fetch users'}</p>
        </div>
      </Container>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Container variant="default">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found</p>
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
          <h2 className="text-2xl font-bold text-gray-800">
            All Users {isFetching && <span className="text-sm text-gray-500">(Loading...)</span>}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, data.pagination.total)} of{' '}
            {data.pagination.total} users
          </p>
        </div>

        {/* Age Filter */}
        <div className="flex items-center space-x-3">
          <label htmlFor="ageFilter" className="text-sm font-medium text-gray-700">
            Filter by age:
          </label>
          <select
            id="ageFilter"
            value={ageFilter || ''}
            onChange={handleAgeFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All ages</option>
            <option value="18">18 years</option>
            <option value="21">21 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
            <option value="35">35 years</option>
            <option value="40">40 years</option>
            <option value="50">50+ years</option>
          </select>
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
