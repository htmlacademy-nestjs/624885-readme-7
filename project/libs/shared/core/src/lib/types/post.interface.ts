import { PostType } from '@prisma/client';
import { Comment, Like, LinkPost, PhotoPost, QuotePost, Tag, TextPost, VideoPost } from '@project/core';

export interface Post {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorId: string;
  isDraft: boolean;
  repostFrom?: string;
  type: PostType;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
  videoPost?: VideoPost;
  textPost?: TextPost;
  quotePost?: QuotePost;
  photoPost?: PhotoPost;
  linkPost?: LinkPost;
}
