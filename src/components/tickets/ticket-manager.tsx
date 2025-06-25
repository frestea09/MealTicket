'use client'

import type { Ticket } from '@/lib/actions/tickets'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { PlusCircle, Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { TicketTable } from './ticket-table'
import { TicketPagination } from './ticket-pagination'

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

  const handleDeleteConfirm = async () => {
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
            <TicketTable
              tickets={tickets}
              onEdit={handleEdit}
              onDelete={setDeletingTicketId}
            />
          </CardContent>
          <TicketPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
            <AlertDialogAction onClick={handleDeleteConfirm}>
              {i18n.ticketManager.deleteDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
