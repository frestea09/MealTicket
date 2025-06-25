'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { i18n } from '../i18n'
import prisma from '../prisma'

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
      where: { username },
    })

    if (!user) {
      return { error: i18n.actions.auth.invalidCredentials }
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      return { error: i18n.actions.auth.invalidCredentials }
    }

    await createSession(user.id)
  } catch (error) {
    console.error(error)
    return { error: 'An unexpected error occurred.' }
  }

  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
