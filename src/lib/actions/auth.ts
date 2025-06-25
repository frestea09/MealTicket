'use server'

import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { i18n } from '../i18n'

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

  // Using dummy credentials for demo purposes
  const DUMMY_USERNAME = 'admin'
  const DUMMY_PASSWORD = 'password'
  const DUMMY_USER_ID = 1

  if (username !== DUMMY_USERNAME || password !== DUMMY_PASSWORD) {
    return { error: i18n.actions.auth.invalidCredentials }
  }

  await createSession(DUMMY_USER_ID)

  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
