"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  comment: z.string().min(50, {
    message: "Comment must be at least 50 characters.",
  }),
})

export default function CommentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  })
  const { status } = useSession()
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-slate-500 mb-5">Comments</h2>
      {status !== "authenticated" ? (
        <p>You must be logged in</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
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
