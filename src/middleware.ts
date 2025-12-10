import NextAuth from "next-auth"

import authConfig from "@/config/auth"
import {
  DEFAULT_SIGNIN_REDIRECT,
  DEFAULT_UNAUTHENTICATED_REDIRECT,
} from "@/config/defaults"

const { auth } = NextAuth(authConfig)

export const authRoutes = ["/signin", "/signup", "/error"]
export const publicRoutes = [
  "/",
  "/privacy-policy",
  "/booking",
  "/signup/verify-email",
  "/signup/resend-verification",
  "/signin/password-reset",
  "/signin/password-update",
]

export default auth((req) => {
  const authenticated = !!req.auth
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (authenticated) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, req.nextUrl))
    }
    return null
  }

  if (!authenticated && !isPublicRoute) {
    return Response.redirect(
      new URL(DEFAULT_UNAUTHENTICATED_REDIRECT, req.nextUrl)
    )
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
      