import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/useCategories"
import { usePostForm } from "@/state/form"
import { Category } from "@/types"
export default function FormSelect() {
  const { data: CATEGORIES } = useCategories()
  const catSlug = usePostForm((state) => state.categorySlug)
  const setCategorySlug = usePostForm((state) => state.setCategorySlug)
  const setCategoryName = usePostForm((state) => state.setCategoryName)

  const onCategoryChange = (catSlug: string) => {
    setCategorySlug(catSlug)
    CATEGORIES?.find(
      (cat: Category) => cat.slug === catSlug && setCategoryName(cat.title)
    )
  }
  return (
    <div className="mb-3">
      <Select value={catSlug} onValueChange={onCategoryChange}>
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
  )
}
