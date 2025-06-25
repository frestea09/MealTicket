"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ticketSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  room: z.string().min(1, "Room is required"),
  diet: z.string().min(1, "Diet is required"),
  birthDate: z.coerce.date(),
  mealTime: z.string().min(1, "Meal time is required"),
});

export async function createTicket(data: unknown) {
  const validatedFields = ticketSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.ticket.create({
      data: validatedFields.data,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create ticket." };
  }
}

export async function updateTicket(id: number, data: unknown) {
  const validatedFields = ticketSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  
  try {
    await prisma.ticket.update({
      where: { id },
      data: validatedFields.data,
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update ticket." };
  }
}

export async function deleteTicket(id: number) {
  try {
    await prisma.ticket.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete ticket." };
  }
}

export async function getTickets({
  query,
  room,
  date,
}: {
  query?: string;
  room?: string;
  date?: string;
}) {
  try {
    const where: any = {};
    if (query) {
      where.OR = [
        { patientName: { contains: query, mode: "insensitive" } },
        { patientId: { contains: query, mode: "insensitive" } },
      ];
    }
    if (room) {
      where.room = { contains: room, mode: "insensitive" };
    }
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      where.ticketDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: {
        ticketDate: "desc",
      },
    });
    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
}
