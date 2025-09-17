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
import { EmailVerificationForm } from "@/components/forms/auth/email-verification-form"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Email Verification",
  description: "Enter email to receive a verification link",
}

export default function ReverifyEmailPage(): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Enter email to receive a verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <EmailVerificationForm />
          <Link
            aria-label="Cancel email reverification"
            href="/signin"
            className={buttonVariants({ variant: "outline" })}
          >
            <span className="sr-only">
              Cancel email verification request
            </span>
            Cancel
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
   