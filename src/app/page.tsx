import { TicketManager } from "@/components/tickets/ticket-manager";
import { getTickets } from "@/lib/actions/tickets";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.query === "string" ? searchParams.query : undefined;
  const room = typeof searchParams?.room === "string" ? searchParams.room : undefined;
  const date = typeof searchParams?.date === "string" ? searchParams.date : undefined;
  const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams?.limit === 'string' ? Number(searchParams.limit) : 5;

  const { tickets, totalPages, currentPage } = await getTickets({ query, room, date, page, limit });

  return <TicketManager tickets={tickets} totalPages={totalPages} currentPage={currentPage} />;
}
