import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/about - Get all about us content
export async function GET() {
  try {
    const aboutEntries = await prisma.aboutUs.findMany()
    
    // Convert to key-value object
    const about: Record<string, string> = {}
    aboutEntries.forEach(entry => {
      about[entry.key] = entry.value
    })
    
    return NextResponse.json(about)
  } catch (error) {
    console.error("Error fetching about us:", error)
    return NextResponse.json({ error: "Failed to fetch about us" }, { status: 500 })
  }
}

// PUT /api/admin/about - Update about us content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Update each key
    for (const [key, value] of Object.entries(body)) {
      await prisma.aboutUs.upsert({
        where: { key },
        create: { key, value: value as string },
        update: { value: value as string }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating about us:", error)
    return NextResponse.json({ error: "Failed to update about us" }, { status: 500 })
  }
}
