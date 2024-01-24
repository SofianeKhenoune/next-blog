"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="flex justify-center border"
    >
      <Moon className="h6 w-6 dark:hidden" />
      <Sun className="h6 w-6 hidden dark:block" />
    </Button>
  )
}
