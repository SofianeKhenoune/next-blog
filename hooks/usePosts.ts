import { useQuery } from "react-query"

const getAllPosts = async () => {
  try {
    const response = await fetch("/api/posts", { method: "GET" })
    if (!response.ok) {
      throw new Error(`erreur HTTP! statut: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error("Erreur lors de la création des données:", error.message)
  }
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  })
}
