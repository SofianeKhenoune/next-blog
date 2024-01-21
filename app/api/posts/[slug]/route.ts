// API Posts
import { POSTS } from '@/utils/posts';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  const post = POSTS.find((post) => post.slug === slug);
  return NextResponse.json(post, { status: 200 });
};
