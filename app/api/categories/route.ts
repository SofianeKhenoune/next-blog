import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

// API Categories

export const GET = async () => {
  try {
    const CATEGORIES = await prisma.category.findMany()
    return NextResponse.json(CATEGORIES, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
