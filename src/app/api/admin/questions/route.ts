import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/questions - Get all FAQ questions
export async function GET() {
  try {
    const questions = await prisma.fAQQuestion.findMany({
      orderBy: { sortOrder: 'asc' }
    })
    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

// POST /api/admin/questions - Create question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, answer, sortOrder } = body

    const faq = await prisma.fAQQuestion.create({
      data: {
        question,
        answer,
        sortOrder: parseInt(sortOrder) || 0
      }
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }
}

// PUT /api/admin/questions - Update question
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    const faq = await prisma.fAQQuestion.update({
      where: { id },
      data
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error("Error updating question:", error)
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 })
  }
}

// DELETE /api/admin/questions - Delete question
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "Question ID required" }, { status: 400 })
    }

    await prisma.fAQQuestion.delete({ where: { id } })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting question:", error)
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 })
  }
}
