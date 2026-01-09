import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Project from "@/models/Project"
import { verifyAdmin } from "@/lib/adminAuth"

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
