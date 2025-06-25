"use client";

import type { Ticket } from "@prisma/client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { PlusCircle, Printer, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TicketForm } from "./ticket-form";
import { generateTicketPdf } from "@/lib/pdf";
import { deleteTicket } from "@/lib/actions/tickets";
import { logout } from "@/lib/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function TicketManager({ tickets, totalPages, currentPage }: { tickets: Ticket[], totalPages: number, currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<number | null>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`/?${params.toString()}`);
  }, 300);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/?${params.toString()}`);
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.replace(`/?${params.toString()}`);
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (deletingTicketId) {
      const result = await deleteTicket(deletingTicketId);
      if (result.success) {
        toast({ title: "Success", description: "Ticket deleted successfully." });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
      setDeletingTicketId(null);
    }
  };
  
  const onFormSuccess = () => {
    setDialogOpen(false);
    setEditingTicket(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-card">
        <h1 className="text-lg font-semibold font-headline md:text-xl">MealTicket Manager</h1>
        <form action={logout}>
          <Button variant="ghost" size="icon" type="submit">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </form>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Meal Tickets</CardTitle>
            <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
              <Input
                placeholder="Search by name or ID..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              />
               <Input
                placeholder="Filter by room..."
                defaultValue={searchParams.get("room")?.toString()}
                onChange={(e) => handleFilterChange('room', e.target.value)}
                className="max-w-xs"
              />
              <Input
                type="date"
                defaultValue={searchParams.get("date")?.toString()}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="max-w-xs"
              />
              <div className="flex-grow" />
              <div className="flex gap-2">
                <Button onClick={() => generateTicketPdf(tickets)} variant="outline">
                  <Printer className="mr-2 h-4 w-4" /> Print Page
                </Button>

                <Dialog open={dialogOpen} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) setEditingTicket(null);
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingTicket ? "Edit Ticket" : "Add New Ticket"}</DialogTitle>
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
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Diet</TableHead>
                  <TableHead>Meal Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div className="font-medium">{ticket.patientName}</div>
                        <div className="text-sm text-muted-foreground">{ticket.patientId}</div>
                      </TableCell>
                      <TableCell>{ticket.room}</TableCell>
                      <TableCell>{ticket.diet}</TableCell>
                      <TableCell>{ticket.mealTime}</TableCell>
                      <TableCell>{format(new Date(ticket.ticketDate), 'dd MMM yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => generateTicketPdf([ticket])}>Print</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(ticket)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeletingTicketId(ticket.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No tickets found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between pt-6">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
      
      <AlertDialog open={!!deletingTicketId} onOpenChange={(open) => !open && setDeletingTicketId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the meal ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
