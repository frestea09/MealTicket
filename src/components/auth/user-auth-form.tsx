"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [state, formAction] = useFormState(login, undefined);
  
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={formAction} className="space-y-4">
        <div className="grid gap-2 text-left">
          <Label htmlFor="username">Username</Label>
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
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>
        
        {state?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {typeof state.error === 'string' ? state.error : 'An error occurred.'}
            </AlertDescription>
          </Alert>
        )}
        
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}
