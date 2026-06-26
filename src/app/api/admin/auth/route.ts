import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "goayachtworld@gmail.com"
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 3

// GET /api/admin/auth - Check admin status
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")
  
  if (!token) {
    return NextResponse.json({ authenticated: false })
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string }
    if (decoded.email === ADMIN_EMAIL) {
      return NextResponse.json({ authenticated: true, email: decoded.email })
    }
    return NextResponse.json({ authenticated: false })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, password, email } = body
    
    // Check lockout status
    const lockData = await prisma.adminSetting.findUnique({
      where: { key: "lockData" }
    })
    
    if (lockData) {
      const lock = JSON.parse(lockData.value)
      if (lock.lockedUntil && Date.now() < lock.lockedUntil) {
        const remainingMinutes = Math.ceil((lock.lockedUntil - Date.now()) / 60000)
        return NextResponse.json(
          { error: `Account locked. Try again in ${remainingMinutes} minute(s).`, locked: true },
          { status: 403 }
        )
      }
    }
    
    if (action === "login") {
      // Get admin password from settings
      const adminPasswordSetting = await prisma.adminSetting.findUnique({
        where: { key: "password" }
      })
      const storedPassword = adminPasswordSetting?.value || "admin123" // Default fallback
      
      if (password !== storedPassword) {
        // Track failed attempts
        const attemptsKey = "failedAttempts"
        const currentAttempts = await prisma.adminSetting.findUnique({
          where: { key: attemptsKey }
        })
        const attempts = (currentAttempts ? parseInt(currentAttempts.value) : 0) + 1
        
        if (attempts >= MAX_ATTEMPTS) {
          // Lock account
          await prisma.adminSetting.upsert({
            where: { key: "lockData" },
            create: {
              key: "lockData",
              value: JSON.stringify({
                lockedUntil: Date.now() + LOCKOUT_DURATION_MS,
                attempts,
                email: ADMIN_EMAIL
              })
            },
            update: {
              value: JSON.stringify({
                lockedUntil: Date.now() + LOCKOUT_DURATION_MS,
                attempts,
                email: ADMIN_EMAIL
              })
            }
          })
          await prisma.adminSetting.upsert({
            where: { key: attemptsKey },
            create: { key: attemptsKey, value: "0" },
            update: { value: "0" }
          })
          
          return NextResponse.json(
            { error: "Account locked due to too many failed attempts!", locked: true },
            { status: 403 }
          )
        }
        
        await prisma.adminSetting.upsert({
          where: { key: attemptsKey },
          create: { key: attemptsKey, value: attempts.toString() },
          update: { value: attempts.toString() }
        })
        
        const remaining = MAX_ATTEMPTS - attempts
        return NextResponse.json(
          { error: `Incorrect password! ${remaining} attempt(s) remaining.`, attempts },
          { status: 401 }
        )
      }
      
      // Success - reset failed attempts
      await prisma.adminSetting.upsert({
        where: { key: "failedAttempts" },
        create: { key: "failedAttempts", value: "0" },
        update: { value: "0" }
      })
      await prisma.adminSetting.deleteMany({
        where: { key: "lockData" }
      })
      
      // Generate JWT token
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: "ADMIN" },
        JWT_SECRET,
        { expiresIn: "24h" }
      )
      
      return NextResponse.json({
        success: true,
        token,
        email: ADMIN_EMAIL
      })
    }
    
    if (action === "changePassword") {
      // Verify current password first
      const adminPasswordSetting = await prisma.adminSetting.findUnique({
        where: { key: "password" }
      })
      const currentPassword = adminPasswordSetting?.value || "admin123"
      
      if (password.current !== currentPassword) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
      }
      
      if (!password.new || password.new.length < 4) {
        return NextResponse.json({ error: "New password must be at least 4 characters" }, { status: 400 })
      }
      
      await prisma.adminSetting.upsert({
        where: { key: "password" },
        create: { key: "password", value: password.new },
        update: { value: password.new }
      })
      
      return NextResponse.json({ success: true, message: "Password changed successfully" })
    }
    
    if (action === "requestUnlock") {
      // Generate unlock token
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      
      await prisma.unlockToken.create({
        data: {
          email: email || ADMIN_EMAIL,
          token,
          expiresAt
        }
      })
      
      return NextResponse.json({
        success: true,
        message: "Unlock link sent to email",
        unlockToken: token // Remove in production - return token for testing
      })
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
