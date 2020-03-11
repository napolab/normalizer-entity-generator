import { User } from "./user";
import { Comment } from "./comment";
import { BaseModel } from "./base";

export interface Article extends BaseModel {
  author: User;
  title: string;
  comments: Comment[];
  createdAt: Date | null;
}
