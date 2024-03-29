import { PostWithCategory } from "../types"
import PostCard from "./post-card"

type Props = {
  posts: PostWithCategory[]
}
export default function PostList({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {posts &&
        posts.map((post: PostWithCategory) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  )
}
