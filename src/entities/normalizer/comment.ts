import { schema } from "normalizr";

import { user } from "./user";

export interface Comment {
  id: number;
  commenter: string;
}

export const comment = new schema.Entity("comments", {
  commenter: user
});
