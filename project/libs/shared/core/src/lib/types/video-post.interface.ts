import { Post } from '@project/core';

export interface VideoPost {
  id?: string;
  title: string;
  link: string;
  post: Post;
  postId: string;
}
