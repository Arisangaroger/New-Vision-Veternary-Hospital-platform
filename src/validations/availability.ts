import * as z from "zod"

export const hourSchema = z
  .string({
    required_error: "Provide opening hour",
    invalid_type_error: "Invalid data type",
  })
  .length(5)
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Invalid time format. Correct format is HH:MM",
  })
  .nullable()

export const businessHoursIdSchema = z
  .string({
    required_error: "Id is required",
    invalid_type_error: "Input must be text",
  })
  .min(1, {
    message: "Id must be at least 1 character long",
  })
  .max(128, {
    message: "Id can have a maximum of 32 characters",
  })

export const singlePeriodSchema = z.object({
  opening: hourSchema,
  closing: hourSchema,
})

export const dayPeriodsSchema = z.array(singlePeriodSchema).default([])

export const businessHoursSchema = z.object({
  mondayPeriods: dayPeriodsSchema,
  tuesdayPeriods: dayPeriodsSchema,
  wednesdayPeriods: dayPeriodsSchema,
  thursdayPeriods: dayPeriodsSchema,
  fridayPeriods: dayPeriodsSchema,
  saturdayPeriods: dayPeriodsSchema,
  sundayPeriods: dayPeriodsSchema,
})

export const addBusinessHoursSchema = businessHoursSchema

export const updateBusinessHoursSchema = businessHoursSchema.extend({
  id: businessHoursIdSchema,
})

export type AddBusinessHoursInput = z.infer<typeof addBusinessHoursSchema>

export type UpdateBusinessHoursInput = z.infer<typeof updateBusinessHoursSchema>
       