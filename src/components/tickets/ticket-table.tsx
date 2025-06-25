'use client'

import type { Ticket } from '@prisma/client'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { i18n } from '@/lib/i18n'
import { generateTicketPdf } from '@/lib/pdf'

interface TicketTableProps {
  tickets: Ticket[]
  onEdit: (ticket: Ticket) => void
  onDelete: (id: number) => void
}

export function TicketTable({ tickets, onEdit, onDelete }: TicketTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{i18n.ticketManager.table.patientName}</TableHead>
          <TableHead>{i18n.ticketManager.table.room}</TableHead>
          <TableHead>{i18n.ticketManager.table.diet}</TableHead>
          <TableHead>{i18n.ticketManager.table.mealTime}</TableHead>
          <TableHead>{i18n.ticketManager.table.date}</TableHead>
          <TableHead className="text-right">
            {i18n.ticketManager.table.actions}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <div className="font-medium">{ticket.patientName}</div>
                <div className="text-sm text-muted-foreground">
                  {ticket.patientId}
                </div>
              </TableCell>
              <TableCell>{ticket.room}</TableCell>
              <TableCell>{ticket.diet}</TableCell>
              <TableCell>{ticket.mealTime}</TableCell>
              <TableCell>
                {format(new Date(ticket.ticketDate), 'dd MMM yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => generateTicketPdf([ticket])}
                >
                  {i18n.ticketManager.printAction}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(ticket)}
                >
                  {i18n.ticketManager.editAction}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(ticket.id)}
                >
                  {i18n.ticketManager.deleteAction}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              {i18n.ticketManager.noTickets}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
