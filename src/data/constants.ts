import { generateTimeOptions } from "@/lib/utils"

export const TIME_INTERVAL = 30
export const TIME_OPTIONS = generateTimeOptions(TIME_INTERVAL)

export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] satisfies string[]

export const DAY_MAPPINGS = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} satisfies Record<string, string>
   