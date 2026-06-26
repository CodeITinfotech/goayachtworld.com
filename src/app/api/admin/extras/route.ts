import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/extras - Get all extras
export async function GET() {
  try {
    const extras = await prisma.extraService.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json(extras)
  } catch (error) {
    console.error("Error fetching extras:", error)
    return NextResponse.json({ error: "Failed to fetch extras" }, { status: 500 })
  }
}

// POST /api/admin/extras - Create extra
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, sortOrder } = body

    const extra = await prisma.extraService.create({
      data: {
        name,
        price: parseFloat(price) || 0,
        sortOrder: parseInt(sortOrder) || 0
      }
    })

    return NextResponse.json(extra)
  } catch (error) {
    console.error("Error creating extra:", error)
    return NextResponse.json({ error: "Failed to create extra" }, { status: 500 })
  }
}

// PUT /api/admin/extras - Update extra
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    const extra = await prisma.extraService.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined
      }
    })

    return NextResponse.json(extra)
  } catch (error) {
    console.error("Error updating extra:", error)
    return NextResponse.json({ error: "Failed to update extra" }, { status: 500 })
  }
}

// DELETE /api/admin/extras - Delete extra
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "Extra ID required" }, { status: 400 })
    }

    await prisma.extraService.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting extra:", error)
    return NextResponse.json({ error: "Failed to delete extra" }, { status: 500 })
  }
}
