import { Post } from '../entities/post.entity';

export interface PostsResponse {
  posts: Post[];
  count: number;
}
