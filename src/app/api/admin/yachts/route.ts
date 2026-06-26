import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/yachts - Get all yachts
export async function GET(request: NextRequest) {
  try {
    const yachts = await prisma.yacht.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(yachts)
  } catch (error) {
    console.error("Error fetching yachts:", error)
    return NextResponse.json({ error: "Failed to fetch yachts" }, { status: 500 })
  }
}

// POST /api/admin/yachts - Create yacht
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, slug, description, shortDescription, capacity, price,
      categoryId, location, featured, images, amenities, inclusions, exclusions
    } = body

    // Create yacht with related data
    const yacht = await prisma.yacht.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        shortDescription,
        capacity: parseInt(capacity) || 8,
        price: parseFloat(price) || 15000,
        categoryId,
        location,
        featured: featured || false,
        images: images ? {
          create: images.map((img: { url: string; isPrimary?: boolean }, index: number) => ({
            url: img.url,
            isPrimary: img.isPrimary || index === 0,
            sortOrder: index
          }))
        } : undefined,
        amenities: amenities ? {
          create: amenities.map((a: { name: string; icon?: string }) => ({
            name: a.name,
            icon: a.icon || null
          }))
        } : undefined,
        inclusions: inclusions ? {
          create: inclusions.map((text: string) => ({ text }))
        } : undefined,
        exclusions: exclusions ? {
          create: exclusions.map((text: string) => ({ text }))
        } : undefined,
      },
      include: {
        category: true,
        images: true,
      }
    })

    return NextResponse.json(yacht)
  } catch (error) {
    console.error("Error creating yacht:", error)
    return NextResponse.json({ error: "Failed to create yacht" }, { status: 500 })
  }
}

// PUT /api/admin/yachts - Update yacht
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, images, amenities, inclusions, exclusions, ...yachtData } = body

    // Update yacht data
    const yacht = await prisma.yacht.update({
      where: { id },
      data: {
        ...yachtData,
        price: yachtData.price ? parseFloat(yachtData.price) : undefined,
        capacity: yachtData.capacity ? parseInt(yachtData.capacity) : undefined,
      }
    })

    // Update images if provided
    if (images !== undefined) {
      await prisma.yachtImage.deleteMany({ where: { yachtId: id } })
      if (images.length > 0) {
        await prisma.yachtImage.createMany({
          data: images.map((img: { url: string; isPrimary?: boolean }, index: number) => ({
            yachtId: id,
            url: img.url,
            isPrimary: img.isPrimary || index === 0,
            sortOrder: index
          }))
        })
      }
    }

    // Update amenities if provided
    if (amenities !== undefined) {
      await prisma.yachtAmenity.deleteMany({ where: { yachtId: id } })
      if (amenities.length > 0) {
        await prisma.yachtAmenity.createMany({
          data: amenities.map((a: { name: string; icon?: string }) => ({
            yachtId: id,
            name: a.name,
            icon: a.icon || null
          }))
        })
      }
    }

    // Update inclusions if provided
    if (inclusions !== undefined) {
      await prisma.yachtInclusion.deleteMany({ where: { yachtId: id } })
      if (inclusions.length > 0) {
        await prisma.yachtInclusion.createMany({
          data: inclusions.map((text: string) => ({
            yachtId: id,
            text
          }))
        })
      }
    }

    // Update exclusions if provided
    if (exclusions !== undefined) {
      await prisma.yachtExclusion.deleteMany({ where: { yachtId: id } })
      if (exclusions.length > 0) {
        await prisma.yachtExclusion.createMany({
          data: exclusions.map((text: string) => ({
            yachtId: id,
            text
          }))
        })
      }
    }

    const updatedYacht = await prisma.yacht.findUnique({
      where: { id },
      include: { category: true, images: true }
    })

    return NextResponse.json(updatedYacht)
  } catch (error) {
    console.error("Error updating yacht:", error)
    return NextResponse.json({ error: "Failed to update yacht" }, { status: 500 })
  }
}

// DELETE /api/admin/yachts - Delete yacht
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "Yacht ID required" }, { status: 400 })
    }

    await prisma.yacht.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting yacht:", error)
    return NextResponse.json({ error: "Failed to delete yacht" }, { status: 500 })
  }
}
