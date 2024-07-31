import { Post } from '@project/core';

export interface Tag {
  id?: string;
  title: string;
  posts: Post[];
  createdAt?: Date;
  updatedAt?: Date;
}
