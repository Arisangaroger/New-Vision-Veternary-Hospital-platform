import * as z from "zod"

import { bookings } from "@/db/schema"
import { hourSchema } from "@/validations/availability"

export const bookingIdSchema = z
  .string({
    required_error: "Booking Id is required",
    invalid_type_error: "Input data must be text",
  })
  .min(1, {
    message: "Id must be at least 1 character long",
  })
  .max(128, {
    message: "Id can have a maximum of 32 characters",
  })

export const bookingSchema = z.object({
  type: z
    .enum(bookings.type.enumValues, {
      required_error: "Select the type of appointment",
      invalid_type_error: "Invalid data type",
    })
    .default(bookings.type.enumValues[0]),
  date: z.coerce.date({
    required_error: "Select the appointment date",
    invalid_type_error: "Invalid data type",
  }),
  time: hourSchema,
  firstName: z
    .string({
      required_error: "Field is required",
      invalid_type_error: "Invalid data type",
    })
    .max(32, {
      message: "First name should consist of a maximum of 32 characters",
    }),
  lastName: z
    .string({
      required_error: "Field is required",
      invalid_type_error: "Invalid data type",
    })
    .max(32, {
      message: "Last name should consist of a maximum of 32 characters",
    }),
  email: z
    .string({
      required_error: "Field is required",
      invalid_type_error: "Invalid data type",
    })
    .email(),
  phone: z
    .string({
      required_error: "Field is required",
      invalid_type_error: "Invalid data type",
    })
    .min(9, {
      message: "Phone number should consist of at least 9 characters",
    })
    .max(20, {
      message: "Phone number should consist of a maximum of 20 characters",
    }),
  message: z.string().optional(),
  // rodo: z
  //   .boolean({
  //     required_error: "Consent to data processing is required",
  //     invalid_type_error: "Invalid data type",
  //   })
  //   .default(false)
  //   .refine((value) => value === true, {
  //     message: "Consent to data processing is required",
  //   }),
  status: z
    .enum(bookings.status.enumValues)
    .default(bookings.status.enumValues[0]),
})

export const addBookingSchema = bookingSchema

export const updateBookingSchema = bookingSchema.extend({
  id: bookingIdSchema,
})

export const deleteBookingSchema = z.object({
  id: bookingIdSchema,
})

export const checkIfBookingExistsSchema = z.object({
  id: bookingIdSchema,
})

export const filterBookingsSchema = z.object({
  query: z.string().optional(),
})

export type AddBookingInput = z.infer<typeof addBookingSchema>

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

export type DeleteBookingInput = z.infer<typeof deleteBookingSchema>

export type CheckIfBookingExistsInput = z.infer<
  typeof checkIfBookingExistsSchema
>

export type FilterBookingsInput = z.infer<typeof filterBookingsSchema>
        