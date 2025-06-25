'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { i18n } from '../i18n'

// This is a server-side in-memory store.
// It will be reset every time the server restarts.
let tickets = [
  {
    id: 1,
    patientName: 'Budi Santoso',
    patientId: 'P001',
    room: '101A',
    diet: 'Biasa',
    birthDate: new Date('1985-05-15'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 2,
    patientName: 'Ani Yudhoyono',
    patientId: 'P002',
    room: '102B',
    diet: 'Bubur',
    birthDate: new Date('1990-09-20'),
    mealTime: 'Siang',
    ticketDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 3,
    patientName: 'Cakra Khan',
    patientId: 'P003',
    room: '201A',
    diet: 'Cair',
    birthDate: new Date('1978-11-30'),
    mealTime: 'Malam',
    ticketDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 4,
    patientName: 'Dewi Persik',
    patientId: 'P004',
    room: '202B',
    diet: 'Sonde',
    birthDate: new Date('2001-02-10'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
  },
  {
    id: 5,
    patientName: 'Eko Patrio',
    patientId: 'P005',
    room: '301A',
    diet: 'Biasa',
    birthDate: new Date('1995-07-25'),
    mealTime: 'Siang',
    ticketDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

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

  try {
    const newTicket = {
      id: Math.max(0, ...tickets.map((t) => t.id)) + 1,
      ...validatedFields.data,
      ticketDate: new Date(),
      createdAt: new Date(),
    }
    tickets.unshift(newTicket)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.createFailed }
  }
}

export async function updateTicket(id: number, data: unknown) {
  const validatedFields = ticketSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  try {
    const ticketIndex = tickets.findIndex((t) => t.id === id)
    if (ticketIndex === -1) {
      return { error: i18n.actions.tickets.notFound }
    }

    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      ...validatedFields.data,
    }
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.updateFailed }
  }
}

export async function deleteTicket(id: number) {
  try {
    const ticketIndex = tickets.findIndex((t) => t.id === id)
    if (ticketIndex === -1) {
      return { error: i18n.actions.tickets.notFound }
    }
    tickets.splice(ticketIndex, 1)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.deleteFailed }
  }
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
  try {
    let filteredTickets = [...tickets]

    if (query) {
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          ticket.patientName.toLowerCase().includes(query.toLowerCase()) ||
          ticket.patientId.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (room) {
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.room.toLowerCase().includes(room.toLowerCase())
      )
    }

    if (date) {
      filteredTickets = filteredTickets.filter((ticket) => {
        const ticketDate = new Date(ticket.ticketDate)
        const filterDate = new Date(date)
        return (
          ticketDate.getUTCFullYear() === filterDate.getUTCFullYear() &&
          ticketDate.getUTCMonth() === filterDate.getUTCMonth() &&
          ticketDate.getUTCDate() === filterDate.getUTCDate()
        )
      })
    }

    filteredTickets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    const totalTickets = filteredTickets.length
    const totalPages = Math.ceil(totalTickets / limit)
    const offset = (page - 1) * limit
    const paginatedTickets = filteredTickets.slice(offset, offset + limit)

    return {
      tickets: paginatedTickets,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error(error)
    return {
      tickets: [],
      totalPages: 1,
      currentPage: 1,
    }
  }
}
