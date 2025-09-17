import * as z from "zod"

import { users } from "@/db/schema"
import { passwordSchema, userIdSchema } from "@/validations/auth"
import { emailSchema } from "@/validations/email"

export const userNameSchema = z
  .string({
    invalid_type_error: "Name and surname must be text",
  })
  .optional()

export const userSchema = z.object({
  name: userNameSchema,
  surname: userNameSchema,
  role: z
    .enum(users.role.enumValues, {
      required_error: "Role is required",
      invalid_type_error:
        "Role must be one of the predefined text values",
    })
    .default("client"),
  email: emailSchema,
  password: passwordSchema.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    {
      message:
        "Password must be between 8 and 256 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  ),
})

export const getUserByEmailSchema = z.object({
  email: emailSchema,
})

export const getUserByIdSchema = z.object({
  id: userIdSchema,
})

export const getUserByResetPasswordTokenSchema = z.object({
  token: z.string(),
})

export const getUserByEmailVerificationTokenSchema = z.object({
  token: z.string(),
})

export const checkIfUserExistsSchema = z.object({
  id: userIdSchema,
})

export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>

export type GetUserByResetPasswordTokenInput = z.infer<
  typeof getUserByResetPasswordTokenSchema
>

export type GetUserByEmailVerificationTokenInput = z.infer<
  typeof getUserByEmailVerificationTokenSchema
>

export type CheckIfUserExistsInput = z.infer<typeof checkIfUserExistsSchema>
        