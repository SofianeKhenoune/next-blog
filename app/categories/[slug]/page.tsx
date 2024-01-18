type Props = {
  params: {
    slug: string;
  };
};

export default function CategoriesPage({ params }: Props) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div>CategoriesPage</div>
      <div>{params.slug}</div>
    </main>
  );
}
