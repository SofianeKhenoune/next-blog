import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu"
import { Link } from "lucide-react"
import { useSession } from "next-auth/react"
import { navigationMenuTriggerStyle } from "./ui/navigation-menu"

export default function WritePostBtn() {
  const { status } = useSession()
  return (
    status === "authenticated" && (
      <NavigationMenuItem>
        <Link href="/write">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Write a Post
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
  )
}
