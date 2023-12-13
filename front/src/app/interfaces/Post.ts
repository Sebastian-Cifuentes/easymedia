import { User } from "./User";

export interface Post {
    title: string;
    message?: string;
    created_at?: string;
    user?: User;
  }