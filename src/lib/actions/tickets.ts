'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { i18n } from '../i18n'

export interface Ticket {
  id: number
  patientName: string
  patientId: string
  room: string
  diet: string
  birthDate: Date
  mealTime: string
  ticketDate: Date
  createdAt: Date
  updatedAt: Date
}

export type { Ticket }

let tickets: Ticket[] = [
  {
    id: 1,
    patientName: 'Budi Santoso',
    patientId: 'P001',
    room: 'Mawar',
    diet: 'Bubur',
    birthDate: new Date('1985-05-15'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    patientName: 'Siti Aminah',
    patientId: 'P002',
    room: 'Melati',
    diet: 'Biasa',
    birthDate: new Date('1990-11-20'),
    mealTime: 'Siang',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
let nextId = 3

const ticketSchema = z.object({
  patientName: z
    .string()
    .min(1, i18n.ticketForm.validation.patientNameRequired),
  patientId: z.string().min(1, i18n.ticketForm.validation.patientIdRequired),
  room: z.string().min(1, i18n.ticketForm.validation.roomRequired),
  diet: z.string().min(1, i18n.ticketForm.validation.dietRequired),
  birthDate: z.coerce.date(),
  mealTime: z.string().min(1, i18n.ticketForm.validation.mealTimeRequired),
})

export async function createTicket(data: unknown) {
  const validatedFields = ticketSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const newTicket: Ticket = {
    id: nextId++,
    ...validatedFields.data,
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  tickets.unshift(newTicket)
  revalidatePath('/')
  return { success: true }
}

export async function updateTicket(id: number, data: unknown) {
  const validatedFields = ticketSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const ticketIndex = tickets.findIndex((t) => t.id === id)
  if (ticketIndex === -1) {
    return { error: i18n.actions.tickets.notFound }
  }

  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    ...validatedFields.data,
    updatedAt: new Date(),
  }
  revalidatePath('/')
  return { success: true }
}

export async function deleteTicket(id: number) {
  const ticketIndex = tickets.findIndex((t) => t.id === id)
  if (ticketIndex === -1) {
    return { error: i18n.actions.tickets.notFound }
  }
  tickets.splice(ticketIndex, 1)
  revalidatePath('/')
  return { success: true }
}

export async function getTickets({
  query,
  room,
  date,
  page = 1,
  limit = 5,
}: {
  query?: string
  room?: string
  date?: string
  page?: number
  limit?: number
}) {
  let filteredTickets = tickets

  if (query) {
    filteredTickets = filteredTickets.filter(
      (t) =>
        t.patientName.toLowerCase().includes(query.toLowerCase()) ||
        t.patientId.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (room) {
    filteredTickets = filteredTickets.filter((t) =>
      t.room.toLowerCase().includes(room.toLowerCase())
    )
  }

  if (date) {
    const filterDate = new Date(date)
    filteredTickets = filteredTickets.filter((t) => {
      const ticketDate = new Date(t.ticketDate)
      return (
        ticketDate.getFullYear() === filterDate.getFullYear() &&
        ticketDate.getMonth() === filterDate.getMonth() &&
        ticketDate.getDate() === filterDate.getDate()
      )
    })
  }

  const totalTickets = filteredTickets.length
  const totalPages = Math.ceil(totalTickets / limit)
  const offset = (page - 1) * limit
  const paginatedTickets = filteredTickets.slice(offset, offset + limit)

  return {
    tickets: paginatedTickets,
    totalPages,
    currentPage: page,
  }
}
