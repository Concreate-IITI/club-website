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

// GET - Fetch all projects (including inactive)
export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"

    const query = includeInactive ? {} : { isActive: true }
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// POST - Create new project
export async function POST(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    await dbConnect()

    const body = await request.json()
    const project = await Project.create(body)

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: project,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
