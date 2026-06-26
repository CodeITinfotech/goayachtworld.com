import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/gallery - Get all gallery items
export async function GET() {
  try {
    const photos = await prisma.galleryItem.findMany({
      where: { type: 'photos' },
      orderBy: { sortOrder: 'asc' }
    })
    const reels = await prisma.galleryItem.findMany({
      where: { type: 'reels' },
      orderBy: { sortOrder: 'asc' }
    })
    const shorts = await prisma.galleryItem.findMany({
      where: { type: 'shorts' },
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json({ photos, reels, shorts })
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

// POST /api/admin/gallery - Add gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, url } = body

    if (!type || !url) {
      return NextResponse.json({ error: "Type and URL required" }, { status: 400 })
    }

    // Get max sort order for this type
    const maxOrder = await prisma.galleryItem.findFirst({
      where: { type },
      orderBy: { sortOrder: 'desc' }
    })

    const item = await prisma.galleryItem.create({
      data: {
        type,
        url,
        sortOrder: (maxOrder?.sortOrder || 0) + 1
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

// PUT /api/admin/gallery - Update gallery item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    const item = await prisma.galleryItem.update({
      where: { id },
      data
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error updating gallery item:", error)
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}

// DELETE /api/admin/gallery - Delete gallery item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 })
    }

    await prisma.galleryItem.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
  }
}
