import * as z from "zod"

export const clinicIdSchema = z
  .string({
    required_error: "Clinic Id is required",
    invalid_type_error: "Input must be text",
  })
  .min(1, {
    message: "Id must be at least 1 character long",
  })
  .max(128, {
    message: "Id can have a maximum of 32 characters",
  })

export const clinicSchema = z.object({
  latitude: z
    .string({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be text",
    })
    .max(24, {
      message: "Latitude can have a maximum of 24 characters",
    })
    .regex(/^(-?[1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
      message: "Invalid latitude value",
    }),
  longitude: z
    .string({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be text",
    })
    .max(24, {
      message: "Longitude can have a maximum of 24 characters",
    })
    .regex(/^(0|([1-9]|[1-9]\d|1[0-7]\d)(\.\d+)?)$|^180(\.0+)?$/, {
      message: "Invalid longitude value",
    }),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be text",
    })
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(128, { message: "Address can have a maximum of 128 characters" }),
  phone_1: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be text",
    })
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(16, { message: "Phone number can have a maximum of 16 characters" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Invalid phone number format. Only numbers and optionally + at the beginning are allowed",
    }),
  phone_2: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be text",
    })
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(16, { message: "Phone number can have a maximum of 16 characters" })
    .regex(/^\+?[0-9 ]{9,15}$/, {
      message:
        "Invalid phone number format. Only numbers and optionally + at the beginning are allowed",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be text",
    })
    .email({
      message: "Invalid email format",
    })
    .min(6, { message: "Email must be at least 6 characters long" })
    .max(64, { message: "Email can have a maximum of 64 characters" }),
})

export const getClinicByIdSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be text",
  }),
})

export const addClinicSchema = clinicSchema

export const checkIfClinicExistsSchema = z.object({
  id: clinicIdSchema,
})

export const updateClinicSchema = clinicSchema.extend({
  id: clinicIdSchema,
})

export type GetClinicInput = z.infer<typeof getClinicByIdSchema>

export type AddClinicInput = z.infer<typeof addClinicSchema>

export type CheckIfClinicExistsInput = z.infer<typeof checkIfClinicExistsSchema>

export type UpdateClinicInput = z.infer<typeof updateClinicSchema>
      