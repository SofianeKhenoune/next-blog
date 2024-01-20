import { Post } from '@/types';
import { Eye, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className='flex flex-col rounded-lg justify-between border-2 h-full'>
        <CardHeader>
          <div className='aspect-square relative'>
            <Image
              src='/img/middle-code.jpg'
              alt={post.title}
              className='aspect-square object-cover transition-all duration-300 hover:scale-110 rounded-lg'
              fill
            />
          </div>
          <p className='font-semibold text-lg mt-3'>{post.title}</p>
        </CardHeader>
        <CardContent>
          <Badge variant='outline'>{post.category}</Badge>
        </CardContent>
        <CardFooter>
          <div className='flex gap-2'>
            <div className='flex items-center gap-1'>
              <MessageCircle size={20} className='text-slate-500' />
              <p className='text-slate-500'>{post.nbComments}</p>
            </div>
            <div className='flex items-center gap-1'>
              <Eye size={20} className='text-slate-500' />
              <p className='text-slate-500'>{post.nbViews}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
