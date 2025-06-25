'use server'

import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { i18n } from '../i18n'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const loginSchema = z.object({
  username: z.string().min(3, i18n.actions.auth.usernameRequired),
  password: z.string().min(6, i18n.actions.auth.passwordRequired),
})

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data

  try {
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    })

    if (!user) {
      return { error: i18n.actions.auth.invalidCredentials }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
      await createSession(user.id)
      redirect('/')
    } else {
      return { error: i18n.actions.auth.invalidCredentials }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred.' }
  }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
