import { User } from "./user";
import { BaseModel } from "./base";

export interface Comment extends BaseModel {
  commenter: User;
}
