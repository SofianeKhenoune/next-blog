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
import { slugify } from "@/utils/slugify"
import axios from "axios"
import { XCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import { useMutation } from "react-query"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function Write() {
  const router = useRouter()
  const { status } = useSession()
  const { data: CATEGORIES } = useCategories()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [catSlug, setCatSlug] = useState("")
  const [file, setFile] = useState<File>()
  const [image, setImage] = useState<string | null>(null)

  const { mutate, isLoading } = useMutation(
    (newPost: Partial<Post>) => axios.post<Post>("/api/posts", newPost),
    {
      onSuccess: (data) => {
        console.log("Data on success", data)
      },
    }
  )

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files

    if (!files || !files[0]) return
    setFile(files[0])
    setImage(URL.createObjectURL(files[0]))
  }

  const uploadImage = async () => {
    try {
      if (!file) return
      const data = new FormData()
      data.set("file", file)
      const response = await axios.post("/api/upload", data)
      return response.data
    } catch (error: any) {
      console.log("error on upload image", error)
    }
  }
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const imageSrc = (await uploadImage()) || {
      imageUrl: "/img/middle-code.jpg",
    }
    const { imageUrl } = imageSrc
    if (title !== "" || content !== "" || catSlug !== "" || imageSrc) {
      await mutate({
        title,
        content,
        slug: slugify(title),
        image: imageUrl,
        catSlug,
        catName: CATEGORIES?.find((cat: Category) => cat.slug === catSlug)
          ?.title,
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
        <Input
          placeholder="Title"
          type="text"
          className="mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* upload image */}
        <div className="mb-3">
          {image && (
            <div className="w-72 h-72 mx-auto relative rounded-lg overflow-hidden flex">
              <XCircle
                color={"red"}
                size={30}
                className="absolute right-2 top-2 bg-slate-50 z-20 cursor-pointer rounded-full p-1 hover:scale-110"
                onClick={() => {
                  setImage(null)
                }}
              />
              <Image src={image} alt="uploaded image" fill />
            </div>
          )}
          <input type="file" name="image" onChange={onChangeFile} />
        </div>
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
          value={content}
          onChange={setContent}
          className="mb-3"
          placeholder="Write something..."
        />

        {/* submit button */}
        <Button type="submit" onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </PageContainer>
  )
}
