export type Category = {
  id: number
  title: string
  slug: string
  image?: string
}
// à definir dans types.ts à la racine de l'application

export type Post = {
  id: number
  title: string
  image?: string
  createAt: string | Date
  views: number
  nbComments: number
  slug: string
  catSlug: string
  content: string
}
