// API Posts
import { getAuthSession } from "@/lib/auth-options"
import prisma from "@/lib/connect"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const catSlug = searchParams.get("cat")
    const posts = await prisma.post.findMany({
      where: {
        ...(catSlug && catSlug !== "null" && catSlug !== "" && { catSlug }),
      },
      include: {
        cat: true,
      },
    })
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export const POST = async (req: Request) => {
  const session = await getAuthSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await req.json()
  try {
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong : ${error}` },
      { status: 500 }
    )
  }
}
