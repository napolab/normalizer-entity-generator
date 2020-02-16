import { User } from "./user.interface";
import { Comment } from "./comment.interface";

export interface Article {
  id: number;
  author: User;
  title: string;
  comments: Comment[];
}
