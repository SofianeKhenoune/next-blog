"use client"
import { useCategories } from "@/hooks/useCategories"
import { Category } from "@prisma/client"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export default function ResponsiveMenu() {
  const {
    data: CATEGORIES,
    isFetching: isFetchingCategories,
    error: errorCategories,
  } = useCategories()
  if (isFetchingCategories) {
    return <div>Loading...</div>
  }
  if (errorCategories) {
    return <div>Error: There is a problem</div>
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6 md:hidden"></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link href="/write">
          <Button variant="outline">Write a Post</Button>
        </Link>
        <p className="text-2xl">Categories</p>
        {CATEGORIES.map((category: Category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            {category.title}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  )
}
