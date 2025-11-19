/**
 * ===== PAGINATION COMPONENT =====
 * 
 * Smart pagination controls with page numbers and navigation.
 * 
 * Used in: UsersList.tsx, UsersPage.tsx
 * 
 * FEATURES:
 * - Previous/Next buttons (auto-disabled at boundaries)
 * - Page number buttons (highlights current page)
 * - Smart ellipsis (...) for large page counts
 * - Shows max 5 pages at once for clean UI
 * 
 * PAGINATION LOGIC:
 * - Shows all pages if totalPages <= 5
 * - Shows [1, 2, 3, 4, ..., 10] when near start
 * - Shows [1, ..., 7, 8, 9, 10] when near end
 * - Shows [1, ..., 4, 5, 6, ..., 10] when in middle
 * 
 * Props:
 * @param pagination - { page, totalPages, hasNext, hasPrev, total, limit }
 * @param onPageChange - Callback with page number (e.g., setPage(5))
 * 
 * EXAMPLE USAGE:
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(1);
 * const { data } = useGetUsers({ page: currentPage, limit: 10 });
 * 
 * <Pagination
 *   pagination={data.pagination}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 */

import { Button } from '../../../shared/components/ui';
import type { PaginationMeta } from '../types/user.types';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  /**
   * Generate page numbers with smart ellipsis
   * 
   * Returns array like: [1, 2, 3, '...', 10] or [1, '...', 5, 6, 7, '...', 10]
   * This keeps the UI clean even with 100+ pages
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small (e.g., [1, 2, 3, 4, 5])
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis for better UX
      if (page <= 3) {
        // Near the beginning: [1, 2, 3, 4, ..., 10]
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        // Near the end: [1, ..., 7, 8, 9, 10]
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // In the middle: [1, ..., 4, 5, 6, ..., 10]
        pages.push(1);
        pages.push('...');
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <Button
        variant="secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev}
        className="px-4 py-2"
      >
        ← Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const isActive = pageNum === page;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum as number)}
              className={`px-3 py-2 rounded transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="px-4 py-2"
      >
        Next →
      </Button>
    </div>
  );
};

export default Pagination;
