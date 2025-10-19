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

export async function GET(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (!authResult.isAdmin) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    await dbConnect()

    const achievement = await Achievement.findById(params.id).lean()

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          error: "Achievement not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: achievement,
    })
  } catch (error) {
    console.error("Error fetching achievement:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch achievement",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (!authResult.isAdmin) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    await dbConnect()

    const body = await request.json()

    const achievement = await Achievement.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          error: "Achievement not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: achievement,
    })
  } catch (error) {
    console.error("Error updating achievement:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update achievement",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (!authResult.isAdmin) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    await dbConnect()

    const achievement = await Achievement.findByIdAndDelete(params.id)

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          error: "Achievement not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Achievement deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting achievement:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete achievement",
      },
      { status: 500 }
    )
  }
}
