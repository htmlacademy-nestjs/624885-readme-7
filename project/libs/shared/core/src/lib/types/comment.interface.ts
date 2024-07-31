import { Post } from '@project/core';

export interface Comment {
  id?: string;
  text: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
  postId: string;
  post: Post;
}
