import { usePostForm } from "@/state/form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
export default function TextEditor() {
  const content = usePostForm((state) => state.content)
  const setContent = usePostForm((state) => state.setContent)

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-3"
        placeholder="Write something..."
      />
      {content.length < 10 && (
        <p className="text-red-500">
          Content is required and must be at least 150 characters
        </p>
      )}
    </div>
  )
}
