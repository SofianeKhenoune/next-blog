"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import PostList from "@/components/post-list"
import { usePosts } from "@/hooks/usePosts"

type Props = {
  params: {
    slug: string
  }
}
export default function CategoriesPage({ params }: Props) {
  const { slug } = params
  const { data: POSTS, isFetching, error } = usePosts(slug)
  const formattedSlug = slug
    .replace("-", " ")
    .replace(slug.charAt(0), slug.charAt(0).toUpperCase())

  if (isFetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: There is a problem</div>
  }
  return (
    <PageContainer>
      <PageTitle
        title={POSTS && POSTS.length ? POSTS[0].cat.title : formattedSlug}
      />
      {POSTS && POSTS.length === 0 && (
        <p className="text-center">No posts found</p>
      )}
      {!isFetching && <PostList posts={POSTS} />}
    </PageContainer>
  )
}
