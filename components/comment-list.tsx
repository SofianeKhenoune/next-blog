import { useComments } from "@/hooks/useComments"
import { Comment } from "@prisma/client"
import CommentCard from "./comment-card"

export default function CommentList({ postSlug }: { postSlug: string }) {
  const { data: commentList, isFetching, error } = useComments(postSlug)
  if (isFetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: There is a problem</div>
  }
  return (
    <div>
      {/* comment list */}
      {commentList && commentList.length === 0 ? (
        <p className="">No comments yet</p>
      ) : (
        commentList.map((comment: Comment) => (
          <CommentCard
            props={{
              authorName: comment.authorName,
              authorAvatar: comment.authorAvatar,
              content: comment.content,
              createdAt: comment.createdAt.toLocaleString(),
            }}
            key={comment.id}
            {...comment}
          />
        ))
      )}
    </div>
  )
}
