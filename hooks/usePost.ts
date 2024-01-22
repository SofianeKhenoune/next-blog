import { useQuery } from "react-query"

const getPostBySlug = async (slug: string) => {
  try {
    const response = await fetch(`/api/posts/${slug}`, { method: "GET" })
    if (!response.ok) {
      throw new Error("Échec de la requête")
    }
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données:", error.message)
  }
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  })
}
