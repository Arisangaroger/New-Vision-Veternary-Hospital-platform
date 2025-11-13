import Link from "next/link"
import {
  getBusinessHours,
  getDatesUnavailableAsAnArrayOfDates,
} from "@/actions/availability"
import { getAllBookings } from "@/actions/booking"
import Balancer from "react-wrap-balancer"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { BookingAddForm } from "@/components/forms/booking/booking-add-form"

export default async function AddBookingPage(): Promise<JSX.Element> {
  const businessHours = await getBusinessHours()
  const datesUnavailable = await getDatesUnavailableAsAnArrayOfDates()
  const existingBookings = await getAllBookings()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-greenGradientFrom to-greenGradientTo">
      <Card className="w-full bg-primary-foreground px-2 pb-2 pt-8 sm:w-[70vw] md:w-[480px]">
        <CardHeader className="text-center text-2xl font-bold">
          New reservation
        </CardHeader>
        <CardContent>
          <BookingAddForm
            businessHours={businessHours}
            datesUnavailable={datesUnavailable}
            existingBookings={existingBookings}
          />
        </CardContent>
        <CardFooter>
          <p className="text-xs leading-[160%] text-muted-foreground">
            <Balancer>
              By submitting the form, you consent to the processing of your personal
              data for the purpose of the service, in accordance with the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-foreground"
              >
                GDPR clause
              </Link>
              .
            </Balancer>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
    