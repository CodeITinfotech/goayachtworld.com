import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/policies - Get all policies
export async function GET() {
  try {
    const policies = await prisma.policy.findMany()
    
    // Convert to key-value object
    const policyMap: Record<string, string> = {}
    policies.forEach(policy => {
      policyMap[policy.type] = policy.content
    })
    
    return NextResponse.json(policyMap)
  } catch (error) {
    console.error("Error fetching policies:", error)
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 })
  }
}

// PUT /api/admin/policies - Update policy
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, content } = body

    if (!type) {
      return NextResponse.json({ error: "Policy type required" }, { status: 400 })
    }

    const policy = await prisma.policy.upsert({
      where: { type },
      create: { type, content: content || '' },
      update: { content: content || '' }
    })

    return NextResponse.json(policy)
  } catch (error) {
    console.error("Error updating policy:", error)
    return NextResponse.json({ error: "Failed to update policy" }, { status: 500 })
  }
}
