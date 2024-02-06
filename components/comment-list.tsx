export default function CommentList() {
  const commentList = ["comment1", "comment2", "comment3"]
  return (
    <div>
      {/* comment list */}
      {commentList && commentList.length === 0 ? (
        <p className="">No comments yet</p>
      ) : (
        <p className="">Comments</p>
      )}
    </div>
  )
}
