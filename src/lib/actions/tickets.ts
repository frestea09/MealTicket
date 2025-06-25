'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import type { Ticket } from '@prisma/client'
import { i18n } from '../i18n'

// In-memory store for demonstration purposes
let tickets: Ticket[] = [
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
    updatedAt: new Date(),
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
    updatedAt: new Date(),
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
    updatedAt: new Date(),
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
    updatedAt: new Date(),
  },
  {
    id: 5,
    patientName: 'Eko Patrio',
    patientId: 'P005',
    room: '301A',
    diet: 'Biasa',
    birthDate: new Date('1995-07-25'),
    mealTime: 'Siang',
    ticketDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    patientName: 'Fitri Carlina',
    patientId: 'P006',
    room: '101A',
    diet: 'Bubur',
    birthDate: new Date('1987-05-29'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    patientName: 'Giring Ganesha',
    patientId: 'P007',
    room: '102B',
    diet: 'Biasa',
    birthDate: new Date('1983-07-14'),
    mealTime: 'Siang',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    patientName: 'Hesti Purwadinata',
    patientId: 'P008',
    room: '201A',
    diet: 'Cair',
    birthDate: new Date('1983-06-15'),
    mealTime: 'Malam',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    patientName: 'Indra Bekti',
    patientId: 'P009',
    room: '202B',
    diet: 'Sonde',
    birthDate: new Date('1977-12-28'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    patientName: 'Jihan Fahira',
    patientId: 'P010',
    room: '301A',
    diet: 'Biasa',
    birthDate: new Date('1978-02-06'),
    mealTime: 'Siang',
    ticketDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    patientName: 'Krisdayanti',
    patientId: 'P011',
    room: '302B',
    diet: 'Bubur',
    birthDate: new Date('1975-03-24'),
    mealTime: 'Malam',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    patientName: 'Luna Maya',
    patientId: 'P012',
    room: '401A',
    diet: 'Biasa',
    birthDate: new Date('1983-08-26'),
    mealTime: 'Pagi',
    ticketDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
let nextId = 13

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
    const newTicket: Ticket = {
      id: nextId++,
      ...validatedFields.data,
      ticketDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tickets.unshift(newTicket) // Add to the beginning of the array
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
    const updatedTicket: Ticket = {
      ...tickets[ticketIndex],
      ...validatedFields.data,
      updatedAt: new Date(),
    }
    tickets[ticketIndex] = updatedTicket
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.updateFailed }
  }
}

export async function deleteTicket(id: number) {
  try {
    const initialLength = tickets.length
    tickets = tickets.filter((t) => t.id !== id)
    if (tickets.length === initialLength) {
      return { error: i18n.actions.tickets.notFound }
    }
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.deleteFailed }
  }
}

export const getTickets = cache(
  async ({
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
  }) => {
    try {
      let filteredTickets = [...tickets]

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
        const startDate = new Date(date)
        startDate.setUTCHours(0, 0, 0, 0)
        const endDate = new Date(date)
        endDate.setUTCHours(23, 59, 59, 999)

        filteredTickets = filteredTickets.filter((t) => {
          const ticketDate = new Date(t.ticketDate)
          return ticketDate >= startDate && ticketDate <= endDate
        })
      }

      const sortedTickets = filteredTickets.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )

      const totalTickets = sortedTickets.length
      const totalPages = Math.ceil(totalTickets / limit)
      const offset = (page - 1) * limit

      const paginatedTickets = sortedTickets.slice(offset, offset + limit)

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
)
