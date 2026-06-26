import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.yachtCategory.findMany({
      include: { _count: { select: { yachts: true } } },
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST /api/admin/categories - Create category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, image, icon, sortOrder } = body

    const category = await prisma.yachtCategory.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        image,
        icon,
        sortOrder: parseInt(sortOrder) || 0
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

// PUT /api/admin/categories - Update category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    const category = await prisma.yachtCategory.update({
      where: { id },
      data
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE /api/admin/categories - Delete category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "Category ID required" }, { status: 400 })
    }

    // Check if category has yachts
    const yachtCount = await prisma.yacht.count({ where: { categoryId: id } })
    if (yachtCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with existing yachts" },
        { status: 400 }
      )
    }

    await prisma.yachtCategory.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
