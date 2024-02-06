import axios from "axios"
import { useQuery } from "react-query"

const getCategories = async () => {
  try {
    const { data } = await axios.get("/api/categories")
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
