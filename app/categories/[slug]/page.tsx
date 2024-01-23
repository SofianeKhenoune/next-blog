"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import PostList from "@/components/post-list"
import { usePosts } from "@/hooks/usePosts"
import { Post } from "@/types"

type Props = {
  params: {
    slug: string
  }
}
export default function CategoriesPage({ params }: Props) {
  const { slug } = params
  const { data: POSTS, isFetching, error } = usePosts(slug)
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
          slug === "nextjs"
            ? "Next.js"
            : slug
                .replace("-", " ")
                .replace(slug.charAt(0), slug.charAt(0).toUpperCase())
        }
      />
      {POSTS.length === 0 && <p className="text-center">No posts found</p>}
      {!isFetching && (
        <PostList
          posts={POSTS.filter((post: Post) => post.catSlug === params.slug)}
        />
      )}
    </PageContainer>
  )
}
