// API Posts
import { getAuthSession } from "@/lib/auth-options"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const session = await getAuthSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 403 })
  }
  try {
    const body = await req.json()
    const comment = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session.user.email,
        authorName: session.user.name,
        authorAvatar: session.user.image,
      },
    })

    return NextResponse.json(comment, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: `Something went wrong on submitting new comment: ${error}`,
      },
      { status: 500 }
    )
  }
}
