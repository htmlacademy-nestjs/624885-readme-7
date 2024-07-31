import { Post } from '@project/core';

export interface TextPost {
  id?: string;
  post: Post;
  postId: string;
  title: string;
  announce: string;
  text: string;
}
