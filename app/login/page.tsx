import PageContainer from '@/components/page-container';
import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';

export default function Login() {
  return (
    <PageContainer>
      <div className='p-10'>
        <PageTitle title='Login or Register' />
        <div className='flex flex-col justify-center items-center gap-4 max-w-sm mx-auto'>
          <Button>
            <Github className='mr-3' />
            Sign in with GitHub
          </Button>
          <Button>
            <Mail className='mr-3' />
            Sign in with Google
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
