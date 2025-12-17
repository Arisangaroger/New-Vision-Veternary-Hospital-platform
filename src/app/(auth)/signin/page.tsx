import type { Metadata } from "next"
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
import { SignInWithPasswordForm } from "@/components/forms/auth/signin-with-password-form"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Log in",
  description: "Log in to manage bookings and clinic data",
}

export default async function SignInPage(): Promise<JSX.Element> {
  const session = await auth()
  if (session?.user) redirect(DEFAULT_SIGNIN_REDIRECT)

  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center">
      <Card className="bg-background max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:rounded-none max-sm:border-none sm:min-w-[370px] sm:max-w-[368px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Log in</CardTitle>
            <Link href="/">
              <Icons.close className="size-4" />
            </Link>
          </div>
          <CardDescription>
            Log in to manage bookings
          </CardDescription>
        </CardHeader>
        <CardContent className="max-sm:w-full max-sm:max-w-[340px] max-sm:px-10">
          <SignInWithPasswordForm />
        </CardContent>

        <CardFooter className="grid w-full text-sm text-muted-foreground max-sm:max-w-[340px] max-sm:px-10">
          <div>
            <span>Don't have an account? </span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="font-bold tracking-wide text-primary underline-offset-4 transition-colors hover:underline"
            >
              Create an account
              <span className="sr-only">Create an account</span>
            </Link>
            .
          </div>
          <div>
            <span>Forgot password? </span>
            <Link
              aria-label="Reset password"
              href="/signin/password-reset"
              className="text-sm font-normal text-primary underline-offset-4 transition-colors hover:underline"
            >
              Reset password
              <span className="sr-only">Reset password</span>
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
    