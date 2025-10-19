import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Achievement from "@/models/Achievement"
import User from "@/models/User"
import { verifyToken } from "@/lib/authUtils"

// Middleware to verify admin
async function verifyAdmin(request) {
  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return { isAdmin: false, error: "Unauthorized - No token provided" }
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return { isAdmin: false, error: "Unauthorized - Invalid token" }
  }

  await dbConnect()
  const user = await User.findById(decoded.userId)

  if (!user || user.role !== "admin") {
    return { isAdmin: false, error: "Unauthorized - Admin access required" }
  }

  return { isAdmin: true, user }
}

export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (!authResult.isAdmin) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"

    const query = includeInactive ? {} : { isActive: true }
    const achievements = await Achievement.find(query).sort({ year: -1, order: 1 }).lean()

    return NextResponse.json({
      success: true,
      data: achievements,
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch achievements",
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (!authResult.isAdmin) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    await dbConnect()

    const body = await request.json()

    const achievement = await Achievement.create(body)

    return NextResponse.json(
      {
        success: true,
        data: achievement,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating achievement:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create achievement",
      },
      { status: 500 }
    )
  }
}
