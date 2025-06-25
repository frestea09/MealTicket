'use client'

import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/lib/actions/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { i18n } from '@/lib/i18n'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [state, formAction] = useFormState(login, undefined)

  const errorMessage = React.useMemo(() => {
    if (!state?.error) return null
    if (typeof state.error === 'string') {
      return state.error
    }
    // Handle Zod field errors
    const errorMessages = Object.values(state.error).flat()
    return errorMessages.join(', ')
  }, [state])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={formAction} className="space-y-4">
        <div className="grid gap-2 text-left">
          <Label htmlFor="username">{i18n.authForm.usernameLabel}</Label>
          <Input
            id="username"
            name="username"
            placeholder="admin"
            type="text"
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect="off"
            required
          />
        </div>
        <div className="grid gap-2 text-left">
          <Label htmlFor="password">{i18n.authForm.passwordLabel}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{i18n.authForm.errorTitle}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? i18n.authForm.signingIn : i18n.authForm.signIn}
    </Button>
  )
}
