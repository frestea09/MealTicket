import { getTickets } from '@/lib/actions/tickets'
import { TicketManager } from '@/components/tickets/ticket-manager'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = searchParams?.query?.toString()
  const room = searchParams?.room?.toString()
  const date = searchParams?.date?.toString()
  const currentPage = Number(searchParams?.page) || 1

  const { tickets, totalPages } = await getTickets({
    query,
    room,
    date,
    page: currentPage,
  })

  return (
    <TicketManager
      tickets={tickets}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}
