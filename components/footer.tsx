import { CATEGORIES } from '@/utils/categories';
import Link from 'next/link';
import Logo from './logo';
import PageContainer from './page-container';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className='p-4 border-t'>
      <PageContainer>
        <div className='flex items-center justify-between w-full flex-col md:flex-row'>
          <Logo />
          <div className='flex gap-2 flex-col md:flex-row'></div>
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Button variant='ghost'>{category.name}</Button>
            </Link>
          ))}
        </div>
      </PageContainer>
    </footer>
  );
}
