import { redirect } from "next/navigation"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"

export default async function AdminPage() {
  const session = await auth()
  session?.user
    ? redirect("/admin/availability")
    : redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return <div>Admin Page</div>
}
      