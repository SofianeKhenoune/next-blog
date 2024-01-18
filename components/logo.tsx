import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-500'>
        NextBlog
      </h1>
    </Link>
  );
}
