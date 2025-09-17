import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getBusinessHours } from "@/actions/availability"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BusinessHoursUpdateForm } from "@/components/forms/clinic/business-hours-update-form"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: "Availability",
  description: "Define days and hours of appointments",
}

export default async function AvailabilityPage(): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  const currentBusinessHours = await getBusinessHours()

  return (
    <Shell variant="sidebar">
      <PageHeader className="my-8">
        <PageHeaderHeading size="sm">Availability</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Availability management
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Opening hours */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reception hours</CardTitle>
            <CardDescription>
              Hours during which you receive clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessHoursUpdateForm
              currentBusinessHours={currentBusinessHours}
            />
          </CardContent>
        </Card>

        {/* Days unavailable */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Days off</CardTitle>
            <CardDescription>
              Days when you do not receive clients
            </CardDescription>
          </CardHeader>
          <CardContent>calendar and the ability to add days off</CardContent>
        </Card>
      </div>
    </Shell>
  )
}
       