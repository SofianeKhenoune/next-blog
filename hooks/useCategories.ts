import { useQuery } from "react-query"

const getCategories = async () => {
  try {
    const response = await fetch("/api/categories", { method: "GET" })
    if (!response.ok) {
      throw new Error(`erreur HTTP! statut: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error("Erreur lors de la création des données:", error.message)
  }
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })
}
