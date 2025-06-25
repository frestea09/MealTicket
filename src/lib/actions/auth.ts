'use server'

import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { i18n } from '../i18n'

const loginSchema = z.object({
  username: z.string().min(3, i18n.actions.auth.usernameRequired),
  password: z.string().min(6, i18n.actions.auth.passwordRequired),
})

// Dummy user for demonstration
const dummyUser = {
  id: 1,
  username: 'admin',
  password: 'password', // In a real app, this should be a hash
}

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

  if (username === dummyUser.username && password === dummyUser.password) {
    await createSession(dummyUser.id)
    redirect('/')
  } else {
    return { error: i18n.actions.auth.invalidCredentials }
  }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
