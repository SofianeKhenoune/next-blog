import { CATEGORIES } from '@/utils/categories';
import { NextResponse } from 'next/server';

// API Categories

export const GET = async () => {
  return NextResponse.json(CATEGORIES, { status: 200 });
};
