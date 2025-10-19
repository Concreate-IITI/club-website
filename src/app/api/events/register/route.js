import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import EventRegistration from "@/models/EventRegistration"
import Event from "@/models/Event"
import { verifyToken } from "@/lib/authUtils"

// POST - Submit event registration
export async function POST(request) {
  try {
    await dbConnect()

    const body = await request.json()
    const { eventId, formData } = body

    // Verify event exists and registration is enabled
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    if (!event.registrationEnabled) {
      return NextResponse.json({ success: false, message: "Registration is not enabled for this event" }, { status: 400 })
    }

    // Try to get user email if logged in (optional)
    let userEmail = null
    try {
      const token = request.cookies.get("auth-token")?.value
      if (token) {
        const decoded = verifyToken(token)
        userEmail = decoded.email
      }
    } catch (error) {
      // User not logged in, that's okay
    }

    // Create registration
    const registration = await EventRegistration.create({
      eventId,
      eventTitle: event.title,
      userEmail,
      formData: new Map(Object.entries(formData)),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully",
        data: registration,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error submitting registration:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit registration",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
