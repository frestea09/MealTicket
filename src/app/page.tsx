import { TicketManager } from "@/components/tickets/ticket-manager";
import type { Ticket } from "@prisma/client";

const dummyTickets: Ticket[] = [
  { id: 1, patientName: 'Budi Santoso', patientId: 'P001', room: '101A', diet: 'Biasa', birthDate: new Date('1985-05-15'), mealTime: 'Pagi', ticketDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 2, patientName: 'Ani Yudhoyono', patientId: 'P002', room: '102B', diet: 'Bubur', birthDate: new Date('1990-09-20'), mealTime: 'Siang', ticketDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 3, patientName: 'Cakra Khan', patientId: 'P003', room: '201A', diet: 'Cair', birthDate: new Date('1978-11-30'), mealTime: 'Malam', ticketDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 4, patientName: 'Dewi Persik', patientId: 'P004', room: '202B', diet: 'Sonde', birthDate: new Date('2001-02-10'), mealTime: 'Pagi', ticketDate: new Date(Date.now() - 86400000), createdAt: new Date(), updatedAt: new Date() },
  { id: 5, patientName: 'Eko Patrio', patientId: 'P005', room: '301A', diet: 'Biasa', birthDate: new Date('1995-07-25'), mealTime: 'Siang', ticketDate: new Date(Date.now() - 86400000), createdAt: new Date(), updatedAt: new Date() },
];


export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.query === "string" ? searchParams.query : undefined;
  const room = typeof searchParams?.room === "string" ? searchParams.room : undefined;
  const date = typeof searchParams?.date === "string" ? searchParams.date : undefined;

  let tickets = dummyTickets;
  
  if (query) {
    tickets = tickets.filter(
      (ticket) =>
        ticket.patientName.toLowerCase().includes(query.toLowerCase()) ||
        ticket.patientId.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (room) {
    tickets = tickets.filter((ticket) =>
      ticket.room.toLowerCase().includes(room.toLowerCase())
    );
  }

  if (date) {
    tickets = tickets.filter((ticket) => {
      const ticketDateString = ticket.ticketDate.toISOString().split('T')[0];
      return ticketDateString === date;
    });
  }

  return <TicketManager tickets={tickets} />;
}
