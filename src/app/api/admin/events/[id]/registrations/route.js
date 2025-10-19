import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import EventRegistration from "@/models/EventRegistration"
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

// GET all registrations for an event
export async function GET(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params

    console.log("Fetching registrations for event ID:", id)

    // Fetch the event
    const event = await Event.findById(id)
    if (!event) {
      console.log("Event not found:", id)
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    console.log("Event found:", event.title)

    // Fetch registrations
    const registrations = await EventRegistration.find({ eventId: id }).sort({ createdAt: -1 })

    console.log("Found registrations:", registrations.length)

    // Convert Map to Object for JSON serialization
    const formattedRegistrations = registrations.map((reg) => ({
      _id: reg._id,
      eventId: reg.eventId,
      eventTitle: reg.eventTitle,
      userEmail: reg.userEmail,
      formData: Object.fromEntries(reg.formData),
      registeredAt: reg.submittedAt || reg.createdAt,
      status: reg.status,
      createdAt: reg.createdAt,
      updatedAt: reg.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      event: {
        _id: event._id,
        title: event.title,
        description: event.description,
        registrationForm: event.registrationForm,
      },
      registrations: formattedRegistrations,
    })
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch registrations",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
