import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/admin/settings - Get all settings
export async function GET() {
  try {
    const settings = await prisma.adminSetting.findMany({
      where: {
        key: {
          notIn: ['password', 'lockData', 'failedAttempts']
        }
      }
    })
    
    // Convert to key-value object
    const settingsMap: Record<string, string> = {}
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value
    })
    
    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// PUT /api/admin/settings - Update setting
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body

    if (!key) {
      return NextResponse.json({ error: "Setting key required" }, { status: 400 })
    }

    const setting = await prisma.adminSetting.upsert({
      where: { key },
      create: { key, value: value || '' },
      update: { value: value || '' }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error("Error updating setting:", error)
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
  }
}
