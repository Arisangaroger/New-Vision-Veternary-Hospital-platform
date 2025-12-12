import { type AdminNavItem } from "@/types"

export interface AdminConfigProps {
  sidebarNav: AdminNavItem[]
}

export const adminConfig: AdminConfigProps = {
  sidebarNav: [
    {
      title: "Clinic",
      href: "/admin/clinic",
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
    },
    {
      title: "Availability",
      href: "/admin/availability",
    },
    {
      title: "Profile",
      href: "/admin/profile",
    },
  ] satisfies AdminNavItem[],
}
     