"use client"
import FormSelect from "@/components/form-select"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import PostImage from "@/components/post-image"
import TextEditor from "@/components/text-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePostForm } from "@/state/form"
import { Post } from "@/types"
import { slugify } from "@/utils/slugify"
import axios from "axios"
import clsx from "clsx"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useEffect, useRef } from "react"
import { useMutation } from "react-query"
import "react-quill/dist/quill.snow.css"

export default function Write() {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const { status } = useSession()
  const content = usePostForm((state) => state.content)
  const catSlug = usePostForm((state) => state.categorySlug)
  const title = usePostForm((state) => state.title)
  const setTitle = usePostForm((state) => state.setTitle)
  const catName = usePostForm((state) => state.categoryName)

  const resetForm = usePostForm((state) => state.reset)
  const file = usePostForm((state) => state.file)
  useEffect(() => {
    ref.current?.focus()
  })
  const { mutate, isLoading } = useMutation(
    (newPost: Partial<Post>) =>
      axios.post<Post>("/api/posts/new-post", newPost),
    {
      onSuccess: (data) => {
        resetForm()
      },
    }
  )

  const uploadImage = async () => {
    try {
      if (!file) return
      const data = new FormData()
      data.set("file", file)
      const response = await axios.post("/api/upload", data)
      return response.data
    } catch (error: any) {
      console.error("error on upload image", error)
    }
  }
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const imageSrc = (await uploadImage()) || {
      imageUrl: "/img/middle-code.jpg",
    }
    const { imageUrl } = imageSrc
    if (title !== "" || content !== "" || catSlug !== "" || imageUrl) {
      await mutate({
        title,
        content,
        slug: slugify(title),
        image: imageUrl,
        catSlug,
        catName,
      })
    }
  }

  if (status === "unauthenticated") {
    router.push("/login")
  }
  return (
    <PageContainer>
      <div>
        <PageTitle title="Write a Post" />
        {/* post title */}
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            name="title"
            className={clsx(
              "mb-3",
              title.trim().length < 10
                ? "border-red-500 border-2"
                : "border-green-500"
            )}
            value={title}
            ref={ref}
          />

          {/* upload image */}
          <PostImage />
          {/* category */}
          <FormSelect />
          {/* content ReactQuill */}
          <TextEditor />
          {/* submit button */}
          <Button type="submit">Publish</Button>
        </form>
        <p>{}</p>
      </div>
    </PageContainer>
  )
}
