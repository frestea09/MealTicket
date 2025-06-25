import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Hospital } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
        <Hospital className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-headline font-bold mt-4 text-gray-800">
          MealTicket Manager
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please sign in to manage patient meal tickets.
        </p>
        <UserAuthForm className="w-full mt-8" />
      </div>
    </div>
  );
}
