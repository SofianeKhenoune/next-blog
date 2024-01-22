// API Posts
import prisma from '@/lib/connect';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
