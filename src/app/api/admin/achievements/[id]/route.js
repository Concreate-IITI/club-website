import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Achievement from "@/models/Achievement"
import { verifyAdmin } from "@/lib/adminAuth"

export async function GET(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const achievement = await Achievement.findById(id).lean()

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
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const body = await request.json()

    const achievement = await Achievement.findByIdAndUpdate(id, body, {
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
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const achievement = await Achievement.findByIdAndDelete(id)

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
