'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { i18n } from '@/lib/i18n'

interface TicketPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TicketPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TicketPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <CardFooter className="flex items-center justify-between pt-6">
      <span className="text-sm text-muted-foreground">
        {i18n.ticketManager.pagination(currentPage, totalPages)}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          {i18n.ticketManager.previousPage}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {i18n.ticketManager.nextPage}
        </Button>
      </div>
    </CardFooter>
  )
}
