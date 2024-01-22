"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import PostList from "@/components/post-list"
import { useCategories } from "@/hooks/useCategories"
import { usePosts } from "@/hooks/usePosts"
import { Category, Post } from "@/types"

type Props = {
  params: {
    slug: string
  }
}
export default function CategoriesPage({ params }: Props) {
  const { data: POSTS, isFetching, error } = usePosts()
  const { slug } = params
  const { data: CATEGORIES } = useCategories()
  if (isFetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: There is a problem</div>
  }
  return (
    <PageContainer>
      <PageTitle
        title={
          CATEGORIES?.find((category: Category) => category.slug === slug)
            ?.title
        }
      />
      {!isFetching && (
        <PostList
          posts={POSTS.filter((post: Post) => post.catSlug === params.slug)}
        />
      )}
    </PageContainer>
  )
}
