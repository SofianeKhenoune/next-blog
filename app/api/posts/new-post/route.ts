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
    console.log("session", session)

    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email,
        userName: session.user.name,
        userAvatar: session.user.image,
      },
    })
    console.log("Post created", post)

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong on submitting new Post: ${error}` },
      { status: 500 }
    )
  }
}
