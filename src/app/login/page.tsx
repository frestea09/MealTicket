import { UserAuthForm } from '@/components/auth/user-auth-form'
import { i18n } from '@/lib/i18n'
import { Hospital } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <Hospital className="h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold font-headline text-gray-800">
          {i18n.loginPage.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {i18n.loginPage.description}
        </p>
        <UserAuthForm className="mt-8 w-full" />
      </div>
    </div>
  )
}
