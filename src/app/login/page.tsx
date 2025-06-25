import { UserAuthForm } from '@/components/auth/user-auth-form'
import { Hospital } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <Hospital className="h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold font-headline text-gray-800">
          MealTicket Manager
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please sign in to manage patient meal tickets.
        </p>
        <UserAuthForm className="mt-8 w-full" />
      </div>
    </div>
  )
}
