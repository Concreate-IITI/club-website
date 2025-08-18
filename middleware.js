import { NextResponse } from "next/server"
import { verifyToken } from "./src/lib/authUtils"

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protected admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Verify token
      const decoded = verifyToken(token)

      // Check if user has admin role
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // Allow access to admin routes
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Redirect to dashboard if logged in user tries to access login
  if (pathname === "/login") {
    const token = request.cookies.get("auth-token")?.value

    if (token) {
      try {
        const decoded = verifyToken(token)
        if (decoded.role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url))
        }
      } catch (error) {
        // Invalid token, allow access to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
