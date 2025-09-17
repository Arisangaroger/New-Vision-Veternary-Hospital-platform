"use server"

import crypto from "crypto"

import { unstable_noStore as noStore } from "next/cache"
import { getUserByEmail } from "@/actions/user"
import { eq } from "drizzle-orm"

import { db } from "@/config/db"
import { resend } from "@/config/email"
import { users } from "@/db/schema"
import {
  checkIfEmailVerifiedSchema,
  contactFormSchema,
  emailVerificationSchema,
  markEmailAsVerifiedSchema,
  type CheckIfEmailVerifiedInput,
  type ContactFormInput,
  type EmailVerificationFormInput,
  type MarkEmailAsVerifiedInput,
} from "@/validations/email"

import { EmailVerificationEmail } from "@/components/emails/auth/email-verification-email"
import { EnquiryNotificationForNewVisionEmail } from "@/components/emails/contact/enquiry-notification-for-new-vision-email"
import { EnquiryNotificationForCustomerEmail } from "@/components/emails/contact/enquiry-notification-for-customer-email"

export async function resendEmailVerificationLink(
  rawInput: EmailVerificationFormInput
): Promise<"invalid-input" | "not-found" | "verified" | "error" | "success"> {
  try {
    const validatedInput = emailVerificationSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const user = await getUserByEmail({ email: validatedInput.data.email })
    if (!user) return "not-found"
    if (user.emailVerified) return "verified"

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url")

    const userUpdated = await db
      .update(users)
      .set({ emailVerificationToken })
      .where(eq(users.email, validatedInput.data.email))
      .returning()

    const emailSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: [validatedInput.data.email],
      subject: "Verify your email address",
      react: EmailVerificationEmail({
        email: validatedInput.data.email,
        emailVerificationToken,
      }),
    })

    return userUpdated && emailSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error(
      "Error sending verification link. Message was not sent"
    )
  }
}

export async function checkIfEmailVerified(
  rawInput: CheckIfEmailVerifiedInput
): Promise<boolean> {
  try {
    const validatedInput = checkIfEmailVerifiedSchema.safeParse(rawInput)
    if (!validatedInput.success) return false

    noStore()
    const user = await getUserByEmail({ email: validatedInput.data.email })
    return user?.emailVerified instanceof Date ? true : false
  } catch (error) {
    console.error(error)
    throw new Error("Error checking if email has already been verified")
  }
}

export async function markEmailAsVerified(
  rawInput: MarkEmailAsVerifiedInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = markEmailAsVerifiedSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const userUpdated = await db
      .update(users)
      .set({
        emailVerified: new Date(),
        emailVerificationToken: null,
      })
      .where(eq(users.emailVerificationToken, validatedInput.data.token))

    return userUpdated ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error("Error marking email as verified")
  }
}

export async function submitContactForm(
  rawInput: ContactFormInput
): Promise<"invalid-input" | "error" | "success"> {
  try {
    const validatedInput = contactFormSchema.safeParse(rawInput)
    if (!validatedInput.success) return "invalid-input"

    const emailToNewVisionSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: process.env.RESEND_EMAIL_TO,
      subject:
        "Great news! New inquiry from the contact form on the website",
      react: EnquiryNotificationForNewVisionEmail({
        firstName: validatedInput.data.firstName,
        lastName: validatedInput.data.lastName,
        email: validatedInput.data.email,
        phone: validatedInput.data.phone,
        message: validatedInput.data.message,
      }),
    })

    const emailToCustomerSent = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: process.env.RESEND_EMAIL_TO,
      subject: "Thank you! We have received your inquiry",
      react: EnquiryNotificationForCustomerEmail({
        firstName: validatedInput.data.firstName,
        lastName: validatedInput.data.lastName,
        email: validatedInput.data.email,
        phone: validatedInput.data.phone,
        message: validatedInput.data.message,
      }),
    })

    return emailToNewVisionSent && emailToCustomerSent ? "success" : "error"
  } catch (error) {
    console.error(error)
    throw new Error(
      "Error submitting contact form. Form was not sent"
    )
  }
}
    