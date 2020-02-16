import { schema } from "normalizr";

export interface User {
  id: number;
  name: string;
}

export const user = new schema.Entity("users", {});
