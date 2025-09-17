import { type Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordResetForm } from "@/components/forms/auth/password-reset-form"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Password Reset",
  description: "Enter your email address to receive a password reset link",
}

export default function PasswordReset(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            A link will be sent to the specified address
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <PasswordResetForm />
          <Link
            aria-label="Return to login page"
            href="/signin"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
       