import * as z from "zod"

import { emailSchema } from "@/validations/email"

export const userIdSchema = z
  .string({
    required_error: "User Id is required",
    invalid_type_error: "Input must be text",
  })
  .min(1, {
    message: "Id must be at least 1 character long",
  })
  .max(128, {
    message: "Id can have a maximum of 128 characters",
  })

export const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Invalid data type",
  })
  .min(8, {
    message: "Password must consist of at least 8 characters",
  })
  .max(256, {
    message: "Password cannot be longer than 256 characters",
  })

export const signUpWithPasswordSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must be 8 to 256 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "The provided passwords are different",
    path: ["confirmPassword"],
  })

export const signInWithPasswordSchema = z.object({
  email: emailSchema,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Invalid data type",
  }),
})

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must be 8 to 256 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "The provided passwords are different",
    path: ["confirmPassword"],
  })

export const passwordUpdateSchemaExtended = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          "Password must be 8 to 256 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
    confirmPassword: z.string(),
    resetPasswordToken: z
      .string({
        required_error: "Password reset token is required",
        invalid_type_error: "Invalid data type",
      })
      .min(16)
      .max(512),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "The provided passwords are different",
    path: ["confirmPassword"],
  })

export const linkOAuthAccountSchema = z.object({
  userId: userIdSchema,
})

export type SignUpWithPasswordFormInput = z.infer<
  typeof signUpWithPasswordSchema
>

export type SignInWithPasswordFormInput = z.infer<
  typeof signInWithPasswordSchema
>

export type PasswordResetFormInput = z.infer<typeof passwordResetSchema>

export type PasswordUpdateFormInput = z.infer<typeof passwordUpdateSchema>

export type PasswordUpdateFormInputExtended = z.infer<
  typeof passwordUpdateSchemaExtended
>

export type LinkOAuthAccountInput = z.infer<typeof linkOAuthAccountSchema>
      