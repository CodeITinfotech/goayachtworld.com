import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/contacts - Get all contact submissions
export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// DELETE /api/admin/contacts - Delete contact submission
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const clearAll = searchParams.get("clear")
    
    if (clearAll === "all") {
      await prisma.contactSubmission.deleteMany({})
      return NextResponse.json({ success: true })
    }
    
    if (!id) {
      return NextResponse.json({ error: "Contact ID required" }, { status: 400 })
    }

    await prisma.contactSubmission.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}
