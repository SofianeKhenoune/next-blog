"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Comment } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"

type CommentFormProps = {
  postSlug: string
}

const formSchema = z.object({
  content: z.string().min(50, {
    message: "Comment must be at least 50 characters.",
  }),
})

export default function CommentForm({ ...props }: CommentFormProps) {
  const { status } = useSession()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })
  const createComment = (newComment: Partial<Comment>) =>
    axios.post("/api/comments/new", newComment).then((res) => res.data)
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => {
      console.log(data)
      router.push(`/posts/${data.postSlug}`)
    },
  })
  const onSubmit = (data: any) => {
    const content = data.content
    const postSlug = props.postSlug
    mutate({
      content,
      postSlug,
    })
  }
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-slate-500 mb-5">Comments</h2>
      {status !== "authenticated" ? (
        <p className="flex justify-between">
          You must be logged in to add a comment{" "}
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder={"Add your comment"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add your comment</Button>
          </form>
        </Form>
      )}
    </div>
  )
}
