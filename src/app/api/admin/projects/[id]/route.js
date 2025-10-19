import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Project from "@/models/Project"
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

// GET - Fetch single project
export async function GET(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// PUT - Update project
export async function PUT(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const body = await request.json()

    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete project
export async function DELETE(request, { params }) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { id } = await params
    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
