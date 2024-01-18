import { CATEGORIES } from '@/utils/categories';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='w-6 h-6 md:hidden'></Menu>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <Link href='/write'>
          <Button variant='outline'>Write a Post</Button>
        </Link>
        <p className='text-2xl'>Categories</p>
        {CATEGORIES.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
