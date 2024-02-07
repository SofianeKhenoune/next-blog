import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

// API Categories

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const COMMENTS = await prisma.comment.findMany({
      where: {
        postSlug: params.slug,
      },
    })
    return NextResponse.json(COMMENTS, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
