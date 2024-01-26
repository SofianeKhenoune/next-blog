import { create } from "zustand"

type FormStore = {
  title: string
  content: string
  categorySlug: string
  categoryName: string
  imgUrl: string | null
  file: File | null
}

type FormAction = {
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setCategorySlug: (categorySlug: string) => void
  setCategoryName: (categoryName: string) => void
  setImgUrl: (imgUrl: string) => void
  setFile: (file: File) => void
  reset: () => void
}

export const usePostForm = create<FormStore & FormAction>()((set) => ({
  title: "",
  content: "",
  categorySlug: "",
  categoryName: "",
  imgUrl: null,
  file: null,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setCategorySlug: (categorySlug) => set({ categorySlug }),
  setCategoryName: (categoryName) => set({ categoryName }),
  setImgUrl: (imgUrl) => set({ imgUrl }),
  setFile: (file) => set({ file }),

  reset: () =>
    set({
      title: "",
      content: "",
      categorySlug: "",
      categoryName: "",
      imgUrl: null,
      file: null,
    }),
}))
