import { schema } from "normalizr";

import { user } from "./user";
import { comment } from "./comment";

export interface Article {
  id: number;
  author: string;
  title: string;
  comments: string[];
}

export const article = new schema.Entity("articles", {
  author: user,
  comments: [comment]
});
