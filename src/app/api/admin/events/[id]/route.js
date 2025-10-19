import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Event from "@/models/Event"
import User from "@/models/User"
import { verifyToken } from "@/lib/authUtils"

// Verify admin middleware
async function verifyAdmin(request) {
  try {
    await dbConnect()

    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return { error: "No authentication token found", status: 401 }
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId).select("-password")

    if (!user || !user.isActive) {
      return { error: "User not found or inactive", status: 401 }
    }

    if (user.role !== "admin") {
      return { error: "Admin access required", status: 403 }
    }

    return { user }
  } catch (error) {
    console.error("Auth verification error:", error)
    return { error: "Authentication failed", status: 401 }
  }
}

// GET single event
export async function GET(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const event = await Event.findById(id)

    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error("Error fetching event:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch event",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// PUT update event
export async function PUT(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const body = await request.json()

    const event = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      data: event,
    })
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update event",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// DELETE event
export async function DELETE(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const event = await Event.findByIdAndDelete(id)

    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete event",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
