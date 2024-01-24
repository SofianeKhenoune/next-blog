"use client"
import PostList from "@/components/post-list"
import { useCategories } from "@/hooks/useCategories"
import { usePosts } from "@/hooks/usePosts"

import { Category } from "@/types"
import Link from "next/link"
import PageContainer from "../components/page-container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Hero({ params }: { params: { cat?: string } }) {
  const { cat } = params
  const { data: POSTS, isFetching, error } = usePosts(cat)
  const {
    data: CATEGORIES,
    isFetching: isFetchingCategories,
    error: errorCategories,
  } = useCategories()

  if (isFetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: There is a problem</div>
  }
  if (isFetchingCategories) {
    return <div>Loading...</div>
  }
  if (errorCategories) {
    return <div>Error: There is a problem</div>
  }
  return (
    <PageContainer>
      <div className="py-10 px-4">
        {/* first section hero */}
        <div
          className="py-10 px-4 rounded-lg aspect-square md:aspect-[2.4/1] bg-cover overflow-hidden flex justify-center items-center"
          style={{
            backgroundImage: "url(/img/big-code.jpg)",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-center m-auto rounded-lg border bg-secondary/70">
            <h2 className="capitalize text-xl sm:text-2xl md:text-4xl font-bold">
              become a better software engineer
            </h2>
            <Input
              placeholder="Email"
              type="email"
              className="dark:bg-slate-50"
            />
            <Button className="capitalize w-full text-xs md:text-xl" size="lg">
              subscribe to our newsletter
            </Button>
          </div>
        </div>
        {/* second section categories */}
        <div className="p-4 mt-6 flex flex-col gap-4 md:flex-row justify-center items-center">
          {!isFetchingCategories &&
            CATEGORIES.map((category: Category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Button variant="outline">{category.title}</Button>
              </Link>
            ))}
        </div>
        {/* third section posts */}
        {!isFetching && <PostList posts={POSTS} />}
      </div>
    </PageContainer>
  )
}
