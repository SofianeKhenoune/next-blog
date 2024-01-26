import { usePostForm } from "@/state/form"
import { XCircle } from "lucide-react"
import Image from "next/image"
import { SyntheticEvent } from "react"

export default function PostImage() {
  const img = usePostForm((state) => state.imgUrl)
  const setImgUrl = usePostForm((state) => state.setImgUrl)
  const setFile = usePostForm((state) => state.setFile)
  const file = usePostForm((state) => state.file)
  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files
    if (!files || !files[0]) return
    setFile(files[0])
    setImgUrl(URL.createObjectURL(files[0]))
  }

  return (
    <div className="mb-3">
      {img && (
        <div className="w-72 h-72 mx-auto relative rounded-lg overflow-hidden flex">
          <XCircle
            color={"red"}
            size={30}
            className="absolute right-2 top-2 bg-slate-50 z-20 cursor-pointer rounded-full p-1 hover:scale-110"
            onClick={() => {
              setImgUrl("")
              const fileInput = document.querySelector(
                "input[type=file]"
              ) as HTMLInputElement
              fileInput.value = ""
            }}
          />
          <Image src={img} alt="uploaded image" fill />
        </div>
      )}
      <input type="file" name="image" onChange={onChangeFile} />
    </div>
  )
}
