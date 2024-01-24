"use client"
import Loading from "@/app/loading"
import { cn } from "@/lib/utils"
import { Category } from "@/types"
import Link from "next/link"
import * as React from "react"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useCategories } from "@/hooks/useCategories"
import { useSession } from "next-auth/react"
export function HeaderNavigation() {
  const { status } = useSession()
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
    <React.Suspense fallback={<Loading />}>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {CATEGORIES.map((category: Category) => (
                  <ListItem
                    key={category.id}
                    href={`/categories/${category.slug}`}
                  >
                    {category.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {status === "authenticated" && (
            <NavigationMenuItem>
              <Link href="/write" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Write a Post
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </React.Suspense>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
