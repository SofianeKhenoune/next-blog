import PageContainer from '@/components/page-container';
import PageTitle from '@/components/page-title';

type Props = {
  params: {
    slug: string;
  };
};

export default function CategoriesPage({ params }: Props) {
  return (
    <PageContainer>
      <PageTitle title={params.slug.replace('-', ' ')} />
    </PageContainer>
  );
}
