'use client'

import type { Ticket } from '@prisma/client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { PlusCircle, Printer } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { TicketForm } from './ticket-form'
import { generateTicketPdf } from '@/lib/pdf'
import { deleteTicket } from '@/lib/actions/tickets'
import { useToast } from '@/hooks/use-toast'
import { i18n } from '@/lib/i18n'

export function TicketManager({
  tickets,
  totalPages,
  currentPage,
}: {
  tickets: Ticket[]
  totalPages: number
  currentPage: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
  const [deletingTicketId, setDeletingTicketId] = useState<number | null>(null)

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`/?${params.toString()}`)
  }, 300)

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.replace(`/?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    router.replace(`/?${params.toString()}`)
  }

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (deletingTicketId) {
      const result = await deleteTicket(deletingTicketId)
      if (result.success) {
        toast({
          title: i18n.ticketForm.successTitle,
          description: i18n.ticketManager.deleteSuccess,
        })
      } else {
        toast({
          variant: 'destructive',
          title: i18n.ticketForm.errorTitle,
          description: result.error,
        })
      }
      setDeletingTicketId(null)
    }
  }

  const onFormSuccess = () => {
    setDialogOpen(false)
    setEditingTicket(null)
  }

  return (
    <>
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>{i18n.ticketManager.cardTitle}</CardTitle>
            <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
              <Input
                placeholder={i18n.ticketManager.searchPlaceholder}
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              />
              <Input
                placeholder={i18n.ticketManager.roomFilterPlaceholder}
                defaultValue={searchParams.get('room')?.toString()}
                onChange={(e) => handleFilterChange('room', e.target.value)}
                className="max-w-xs"
              />
              <Input
                type="date"
                defaultValue={searchParams.get('date')?.toString()}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="max-w-xs"
              />
              <div className="flex-grow" />
              <div className="flex gap-2">
                <Button
                  onClick={() => generateTicketPdf(tickets)}
                  variant="outline"
                >
                  <Printer className="mr-2 h-4 w-4" />{' '}
                  {i18n.ticketManager.printPage}
                </Button>

                <Dialog
                  open={dialogOpen}
                  onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) setEditingTicket(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />{' '}
                      {i18n.ticketManager.addTicket}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingTicket
                          ? i18n.ticketManager.editTicketTitle
                          : i18n.ticketManager.addTicketTitle}
                      </DialogTitle>
                    </DialogHeader>
                    <TicketForm
                      key={editingTicket?.id || 'new'}
                      ticket={editingTicket}
                      onSuccess={onFormSuccess}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                          onClick={() => handleEdit(ticket)}
                        >
                          {i18n.ticketManager.editAction}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingTicketId(ticket.id)}
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
          </CardContent>
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between pt-6">
              <span className="text-sm text-muted-foreground">
                {i18n.ticketManager.pagination(currentPage, totalPages)}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  {i18n.ticketManager.previousPage}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  {i18n.ticketManager.nextPage}
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </main>

      <AlertDialog
        open={!!deletingTicketId}
        onOpenChange={(open) => !open && setDeletingTicketId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {i18n.ticketManager.deleteDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {i18n.ticketManager.deleteDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {i18n.ticketManager.deleteDialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {i18n.ticketManager.deleteDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
