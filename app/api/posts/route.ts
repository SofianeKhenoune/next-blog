// API Posts
import prisma from '@/lib/connect';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
