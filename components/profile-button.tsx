"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"

export default function ProfileButton() {
  const { data: session, status } = useSession()
  console.log("session", session, status)

  const onLogout = () => {
    signOut({ callbackUrl: "/login" })
  }
  // User is not logged in -> login button
  if (!session) {
    return (
      <Link href="/login">
        <Button> Login</Button>
      </Link>
    )
  }
  // User is logged in -> avatar + menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage
              src={
                (session?.user?.image as string) ||
                "https://github.com/shadcn.png"
              }
              alt={session?.user?.name as string}
            />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button onClick={onLogout}>Log out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
