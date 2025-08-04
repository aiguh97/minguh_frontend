// src/components/webinar-pagination-view.tsx
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination';
import { Webinar, WebinarCard } from '../../_components/_reusable/WebinarCard';

const webinars: Webinar[] = [
  {
    id: '1',
    title: 'Upcoming Webinar',
    subtitle:
      'Next Generation Frontend Architecture Using Layout Engine And React Native Web.',
    date: '17 Nov 23',
    duration: '32 minutes',
    imageUrl: '/placeholder-webinar.png',
  },
  {
    id: '2',
    title: 'Advanced State Management',
    subtitle:
      'Scaling frontend apps with reactive stores and edge caching.',
    date: '24 Nov 23',
    duration: '45 minutes',
    imageUrl: '/placeholder-webinar2.png',
  },
  {
    id: '3',
    title: 'Design Systems Deep Dive',
    subtitle:
      'Building consistent UI with tokens and components.',
    date: '1 Dec 23',
    duration: '50 minutes',
    imageUrl: '/placeholder-webinar3.png',
  },
  {
    id: '4',
    title: 'Performance Optimization',
    subtitle: 'Rendering fast UIs and lazy loading strategies.',
    date: '8 Dec 23',
    duration: '40 minutes',
    imageUrl: '/placeholder-webinar4.png',
  },
  {
    id: '5',
    title: 'Accessibility First',
    subtitle: 'Making inclusive web experiences.',
    date: '15 Dec 23',
    duration: '35 minutes',
    imageUrl: '/placeholder-webinar5.png',
  },
  // ... tambah lebih banyak jika perlu
];

const ITEMS_PER_PAGE = 6;

export function WebinarPaginationView() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(webinars.length / ITEMS_PER_PAGE);

  const onPageChange = (p: number) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = webinars.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // build simple straight page numbers with ellipsis when many
  const pageNumbers: (number | 'ellipsis')[] = [];
  const delta = 1; // neighbors
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pageNumbers.push(1);
  if (rangeStart > 2) pageNumbers.push('ellipsis');
  for (let i = rangeStart; i <= rangeEnd; i++) pageNumbers.push(i);
  if (rangeEnd < totalPages - 1) pageNumbers.push('ellipsis');
  if (totalPages > 1) pageNumbers.push(totalPages);

  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);

  return (
    <div className="space-y-8 mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {currentItems.map((w) => (
        <WebinarCard key={w.id} webinar={w} />
      ))}
    </div>

    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {pageNumbers.map((page, idx) => (
            <React.Fragment key={idx}>
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
            <PaginationNext
              onClick={handleNext}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
  );
}
