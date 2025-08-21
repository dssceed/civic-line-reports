import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  startIndex: number
  endIndex: number
  onPageChange: (page: number) => void
  onNextPage: () => void
  onPrevPage: () => void
  onFirstPage: () => void
  onLastPage: () => void
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  hasNextPage,
  hasPrevPage
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2)
      let end = Math.min(totalPages, currentPage + 2)
      
      // Adjust if we're near the edges
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5)
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-700/30 border-t border-blue-500/20">
      {/* Items info */}
      <div className="text-sm text-blue-300">
        แสดง {startIndex} ถึง {endIndex} จาก {totalItems} รายการ
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFirstPage}
          disabled={!hasPrevPage}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={!hasPrevPage}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
              }
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onLastPage}
          disabled={!hasNextPage}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
