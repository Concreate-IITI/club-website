import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import TeamMember from "@/models/TeamMember"
import User from "@/models/User"
import { verifyToken, sanitizeInput } from "@/lib/authUtils"
import { z } from "zod"

// Validation schema for team member
const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  position: z.string().min(1, "Position is required").max(100, "Position too long"),
  department: z.string().min(1, "Department is required").max(100, "Department too long"),
  skills: z.array(z.string().max(50, "Skill name too long")).optional().default([]),
  image: z.string().min(1, "Image is required"),
  imagePublicId: z.string().optional().nullable(),
  social: z
    .object({
      insta: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
      linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
      email: z.string().email("Invalid email").optional().or(z.literal("")),
    })
    .optional()
    .default({}),
  isActive: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
})

// Middleware to verify admin authentication
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

// GET - Get all team members (admin view)
export async function GET(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("includeInactive") === "true"

    let query = {}
    if (!includeInactive) {
      query.isActive = true
    }

    const teamMembers = await TeamMember.find(query).populate("createdBy", "username email").sort({ order: 1, createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        data: teamMembers,
        total: teamMembers.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Get team members error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch team members" }, { status: 500 })
  }
}

// POST - Create new team member
export async function POST(request) {
  try {
    const authResult = await verifyAdmin(request)
    if (authResult.error) {
      return NextResponse.json({ success: false, message: authResult.error }, { status: authResult.status })
    }

    const body = await request.json()

    // Validate input
    const validationResult = teamMemberSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const teamMemberData = validationResult.data

    // Sanitize string inputs
    teamMemberData.name = sanitizeInput(teamMemberData.name)
    teamMemberData.position = sanitizeInput(teamMemberData.position)
    teamMemberData.department = sanitizeInput(teamMemberData.department)
    teamMemberData.skills = teamMemberData.skills.map((skill) => sanitizeInput(skill))

    // Add creator information
    teamMemberData.createdBy = authResult.user._id

    // Create team member
    const teamMember = new TeamMember(teamMemberData)
    await teamMember.save()

    // Populate creator info for response
    await teamMember.populate("createdBy", "username email")

    return NextResponse.json(
      {
        success: true,
        message: "Team member created successfully",
        data: teamMember,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create team member error:", error)

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, message: "Failed to create team member" }, { status: 500 })
  }
}
