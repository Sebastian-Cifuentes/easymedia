import { User } from "./User";

export interface Post {
    title: string;
    message?: string;
    createdAt?: string;
    user?: User;
  }