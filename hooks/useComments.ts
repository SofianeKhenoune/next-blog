import axios from "axios"
import { useQuery } from "react-query"

export function useComments(postSlug: string) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () =>
      await axios.get(`/api/comments/list/${postSlug}`).then((res) => res.data),
  })
}
