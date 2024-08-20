import { PostType } from '@prisma/client';
import { Entity, Post, StorableEntity, VideoPost } from '@project/core';
import { BlogTagEntity } from '@blogs/tag';
import { BlogCommentEntity } from '@blogs/comment';
import { BlogLikeEntity } from '@blogs/like';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public authorId: string;
  public isDraft: boolean;
  public repostFrom?: string;
  public type: PostType;
  public tags: BlogTagEntity[];
  public comments: BlogCommentEntity[];
  public likes: BlogLikeEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public videoPost?: VideoPost;

  public toPOJO(): Post {
    return {
      id: this.id,
      authorId: this.authorId,
      isDraft: this.isDraft,
      repostFrom: this.repostFrom,
      type: this.type,
      tags: this.tags.map(tag => tag.toPOJO()),
      comments: this.comments.map((comment) => comment.toPOJO()),
      likes: this.likes.map((like) => like.toPOJO()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      videoPost: this.videoPost
    }
  }
}
