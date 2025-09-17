import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { DEFAULT_SIGNIN_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpWithPasswordForm } from "@/components/forms/auth/signup-with-password-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Registration",
  description: "Create an account to use the admin panel",
}

export default async function SignUpPage(): Promise<JSX.Element> {
  const session = await auth()
  if (session?.user) redirect(DEFAULT_SIGNIN_REDIRECT)

  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center md:flex">
      <Card className="bg-background max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Registration</CardTitle>
            <Link href="/">
              <Icons.close className="size-4" />
            </Link>
          </div>
          <CardDescription>
            Create an account to get administrator privileges
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
          <SignUpWithPasswordForm />
        </CardContent>
        <CardFooter className="grid w-full gap-4 text-sm text-muted-foreground max-sm:max-w-[340px] max-sm:px-10">
          <div>
            <div>
              <span>Already have an account? </span>
              <Link
                aria-label="Sign in"
                href="/signin"
                className="font-bold tracking-wide text-primary underline-offset-4 transition-all hover:underline"
              >
                Log in
                <span className="sr-only">Log in</span>
              </Link>
              .
            </div>
            <div>
              <span>Lost your verification link? </span>
              <Link
                aria-label="Resend email verification link"
                href="/signup/resend-verification"
                className="text-sm font-normal text-primary underline-offset-4 transition-colors hover:underline"
              >
                Send again
                <span className="sr-only">
                  Send verification link again
                </span>
              </Link>
              .
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
  