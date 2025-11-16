/**
 * Pagination Component
 * 
 * Displays pagination controls with page numbers and navigation.
 */

import { Button } from '../../../shared/components/ui';
import type { PaginationMeta } from '../types/user.types';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (page <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // In the middle
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
