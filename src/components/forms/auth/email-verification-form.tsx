"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { resendEmailVerificationLink } from "@/actions/email"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"
import {
  emailVerificationSchema,
  type EmailVerificationFormInput,
} from "@/validations/email"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export function EmailVerificationForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<EmailVerificationFormInput>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(formData: EmailVerificationFormInput): void {
    startTransition(async () => {
      try {
        const message = await resendEmailVerificationLink({
          email: formData.email,
        })

        switch (message) {
          case "not-found":
            toast({
              title: "User with the provided email address does not exist",
              variant: "destructive",
            })
            form.reset()
            break
          case "verified":
            toast({
              title: "Your email is already verified",
              description: "Go back to the login page and try to log in",
            })
            break
          case "success":
            toast({
              title: "Verification link has been sent",
              description:
                "Click the received link to complete the verification",
            })
            router.push(DEFAULT_UNAUTHENTICATED_REDIRECT)
            break
          default:
            toast({
              title: "Error sending verification link",
              description: "Please try again",
              variant: "destructive",
            })
            router.push("/signup")
        }
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jankowalski@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send link</span>
          )}
          <span className="sr-only">
            Send verification link to the provided email address
          </span>
        </Button>
      </form>
    </Form>
  )
}
       