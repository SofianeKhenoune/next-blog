"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const { status } = useSession()
  if (status === "authenticated") {
    router.push("/")
  }
  const onLogin = (provider: string) => () => {
    // TODO: implement
    signIn(provider)
    // Sign in with provider
    // Redirect
  }
  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Login or Register" />
        <div className="flex flex-col justify-center items-center gap-4 max-w-sm mx-auto">
          <Button onClick={onLogin("github")}>
            <Github className="mr-3" />
            Sign in with GitHub
          </Button>
          <Button onClick={onLogin("google")}>
            <Mail className="mr-3" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
