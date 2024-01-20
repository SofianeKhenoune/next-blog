import CommentForm from '@/components/comment-form';
import PageContainer from '@/components/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Post } from '@/types';
import { POSTS } from '@/utils/posts';
import { Eye, MessageCircle } from 'lucide-react';

type Props = {
  params: {
    slug: string;
  };
};

const SinglePost = ({ params }: Props) => {
  const post = POSTS.find((post: Post) => post.slug === params.slug)!;
  return (
    <PageContainer>
      <div className='py-10 px-4 flex flex-col'>
        <div
          className='flex justify-center items-center sm:aspect-[2.4/1] py-10 px-4 rounded-lg aspect-square bg-cover overflow-hidden'
          style={{ backgroundImage: 'url(/img/big-code.jpg)' }}
        >
          <h2 className='m-auto rounded-lg border bg-secondary/70 p-4 font-bold text-center sm:text-xl md:text-2xl'>
            {post.title}
          </h2>
        </div>

        <div className='flex justify-between items-center text-sm P-3 my-6'>
          <div className='flex gap-4 items-center'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>
                {post.author.charAt(0) +
                  post.author.charAt(post.author.indexOf(' ') + 1)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className=''>{post.author}</p>
              <p className='text-slate-500 text-sm'>{`Posted on ${post.date}`}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='flex items-center gap-1'>
              <MessageCircle size={20} className='' />
              <p className=''>{post.nbComments}</p>
            </div>
            <div className='flex items-center gap-1'>
              <Eye size={20} className='' />
              <p className=''>{post.nbViews}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div
          className='mt-6'
          dangerouslySetInnerHTML={{ __html: post.content as string }}
        ></div>
        <div>
          <CommentForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default SinglePost;
