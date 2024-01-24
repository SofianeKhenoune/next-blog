"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/useCategories"
import { Category, Post } from "@/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { SyntheticEvent, useState } from "react"
import { useMutation } from "react-query"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
export default function Write() {
  const router = useRouter()
  const { status } = useSession()
  const { data: CATEGORIES } = useCategories()
  const [titleValue, setTitleValue] = useState("")
  const [postContent, setPostContent] = useState("")
  const [catSlug, setCatSlug] = useState("react")

  const { mutate, isLoading } = useMutation(
    (newPost: Partial<Post>) =>
      fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
      }),
    {
      onSuccess: (data) => {
        console.log("Data on success", data)
      },
    }
  )
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (titleValue !== "" || postContent !== "" || catSlug !== "") {
      await mutate({
        title: titleValue,
        content: postContent,
        catSlug,
        slug: titleValue.trim().replace(/\s+/g, "-").toLowerCase(),
        image: "/img/big-code.jpg",
      })
    }
    console.log("catSlug", catSlug)
  }

  if (status === "unauthenticated") {
    router.push("/login")
  }
  return (
    <PageContainer>
      <div>
        <PageTitle title="Write a Post" />
        {/* post title */}
        <Input
          placeholder="Title"
          type="text"
          className="mb-3"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        {/* category */}
        <div className="mb-3">
          <Select onValueChange={setCatSlug}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES && CATEGORIES.length ? (
                CATEGORIES.map((category: Category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.title}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="error">
                  No categories or error occured
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        {/* content ReactQuill */}
        <ReactQuill
          theme="snow"
          value={postContent}
          onChange={setPostContent}
          className="mb-3"
          placeholder="Write something..."
        />
        {/* upload image */}
        {/* submit button */}
        <Button type="submit" onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </PageContainer>
  )
}
