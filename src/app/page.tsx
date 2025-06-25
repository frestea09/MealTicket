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

  const tickets = await getTickets({ query, room, date });

  return <TicketManager tickets={tickets} />;
}
