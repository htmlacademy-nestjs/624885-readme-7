import { Post } from '@project/core';

export interface LinkPost {
  id?: string;
  post: Post;
  postId: string;
  link: string;
  description?: string;
}
