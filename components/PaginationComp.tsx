"use client"
import { Pagination } from '@nextui-org/pagination'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PaginationComp({page, totalPages}: {page: number, totalPages: number}) {
    const [currentPage, setCurrentPage] = React.useState(page);
    const router = useRouter();
    const handleChangePage = (newPage: number)=> {
        setCurrentPage(newPage);
        router.push(`?page=${newPage}`);
    }
    return (
      <div className="flex flex-col justify-center items-center mt-5">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    );
  }