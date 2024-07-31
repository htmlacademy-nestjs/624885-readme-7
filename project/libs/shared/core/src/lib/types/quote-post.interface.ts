import { Post } from '@project/core';

export interface QuotePost {
  id?: string;
  post: Post;
  postId: string;
  text: string;
  author: string;
}
