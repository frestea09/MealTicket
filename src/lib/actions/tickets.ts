'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { i18n } from '../i18n'
import prisma from '../prisma'

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
    await prisma.ticket.create({
      data: {
        ...validatedFields.data,
      },
    })
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
    await prisma.ticket.update({
      where: { id },
      data: {
        ...validatedFields.data,
      },
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: i18n.actions.tickets.updateFailed }
  }
}

export async function deleteTicket(id: number) {
  try {
    await prisma.ticket.delete({
      where: { id },
    })
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
      const where: any = {}
      if (query) {
        where.OR = [
          { patientName: { contains: query, mode: 'insensitive' } },
          { patientId: { contains: query, mode: 'insensitive' } },
        ]
      }
      if (room) {
        where.room = { contains: room, mode: 'insensitive' }
      }
      if (date) {
        const startDate = new Date(date)
        startDate.setUTCHours(0, 0, 0, 0)
        const endDate = new Date(date)
        endDate.setUTCHours(23, 59, 59, 999)
        where.ticketDate = {
          gte: startDate,
          lte: endDate,
        }
      }

      const totalTickets = await prisma.ticket.count({ where })
      const totalPages = Math.ceil(totalTickets / limit)
      const offset = (page - 1) * limit

      const tickets = await prisma.ticket.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      })

      return {
        tickets,
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
