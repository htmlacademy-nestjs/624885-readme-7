import { Post } from '@project/core';

export interface Like {
  id?: string;
  userId: string;
  postId: string;
  post: Post
}
