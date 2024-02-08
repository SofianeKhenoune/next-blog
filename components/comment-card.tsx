import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  props: {
    authorName: string
    authorAvatar: string
    content: string
    createdAt: string
  }
}

export default function CommentCard({ props }: Props) {
  return (
    <div className="p-5 border max-w-full my-2">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={props.authorAvatar || "https://github.com/shadcn.png"}
              alt={
                props.authorAvatar
                  ? `avatar de ${props.authorName}`
                  : "@shadcn image"
              }
            />
            <AvatarFallback>
              {props.authorName.charAt(0) +
                props.authorName.charAt(props.authorName.indexOf(" ") + 1)}
            </AvatarFallback>
          </Avatar>
          <p className="">{props.authorName}</p>
        </div>
        <p className="text-slate-500 text-sm sm:hidden">
          {props.createdAt.slice(0, 10)}
        </p>
        <p className="text-slate-500 text-sm hidden sm:block">{`Posted on ${props.createdAt.slice(
          0,
          10
        )}`}</p>
      </div>
      <div className="flex flex-col"></div>
      <p>{props.content}</p>
    </div>
  )
}
