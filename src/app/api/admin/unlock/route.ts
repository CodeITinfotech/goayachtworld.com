import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/unlock?token=xxx - Unlock account with token
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 })
  }

  try {
    // Find the unlock token
    const unlockToken = await prisma.unlockToken.findUnique({
      where: { token }
    })

    if (!unlockToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    // Check if token is expired
    if (Date.now() > unlockToken.expiresAt.getTime()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Check if token was already used
    if (unlockToken.usedAt) {
      return NextResponse.json({ error: "Token already used" }, { status: 400 })
    }

    // Reset failed attempts and lockout
    await prisma.adminSetting.deleteMany({
      where: { key: { in: ["failedAttempts", "lockData"] } }
    })

    // Mark token as used
    await prisma.unlockToken.update({
      where: { id: unlockToken.id },
      data: { usedAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      message: "Account unlocked successfully"
    })
  } catch (error) {
    console.error("Unlock error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
