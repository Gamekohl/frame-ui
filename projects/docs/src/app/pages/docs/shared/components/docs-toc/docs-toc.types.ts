export type DocsTocItem = {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
  children?: DocsTocItem[];
};
