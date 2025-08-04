import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import React from 'react';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// Definisikan props untuk komponen CustomPagination
interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ totalItems, itemsPerPage, currentPage, onPageChange }: CustomPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fungsi helper untuk menghasilkan array halaman
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Jumlah maksimal halaman yang ditampilkan

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('ellipsis');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('ellipsis');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === 'ellipsis' ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(Number(page))}
                  isActive={currentPage === Number(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )}
          </React.Fragment>
        ))}

        <PaginationItem>
          <PaginationNext onClick={handleNext} disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}