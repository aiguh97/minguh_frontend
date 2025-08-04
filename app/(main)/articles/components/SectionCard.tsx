// di file Page.tsx atau komponen lainnya

'use client' // Jika Anda menggunakan Next.js App Router

import { useState } from 'react';
import { CustomPagination } from '../../_components/_reusable/CustomPagination';
// import { CustomPagination } from '@/components/CustomPagination';

const dummyData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
const itemsPerPage = 10;

export default function SectionArticle() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Di sini Anda bisa memuat data baru berdasarkan halaman yang dipilih
    console.log(`Memuat data untuk halaman ${page}`);
  };
  
  // Menghitung item yang akan ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dummyData.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Item</h1>
      <ul className="space-y-2">
        {currentItems.map((item, index) => (
          <li key={index} className="p-2 border rounded-md">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CustomPagination
          totalItems={dummyData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}