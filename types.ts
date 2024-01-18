export type Category = {
  id: number;
  name: string;
  slug: string;
};
// à definir dans types.ts à la racine de l'application

export type Post = {
  id: number;
  category: string;
  title: string;
  image: string;
  caption: string;
  date: string | Date;
  minutesToRead: number;
  author: string;
  nbViews: number;
  nbComments: number;
  slug: string;
  content?: string;
};
