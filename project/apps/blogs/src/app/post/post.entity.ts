import { PostType } from '@prisma/client';
import { Comment, Entity, Like, Post, StorableEntity, Tag } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public authorId: string;
  public isDraft: boolean;
  public repostFrom?: string;
  public type: PostType;
  public tags: Tag[];
  public comments: Comment[];
  public likes: Like[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(post: Post) {
    super();
    this.populate(post);
  }

  public populate(post: Post) {
    if(!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.authorId = post.authorId;
    this.isDraft = post.isDraft;
    this.repostFrom = post.repostFrom ?? undefined;
    this.type = post.type;
    this.tags = post.tags;
    this.comments = post.comments;
    this.likes = post.likes;
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      authorId: this.authorId,
      isDraft: this.isDraft,
      repostFrom: this.repostFrom,
      type: this.type,
      tags: this.tags,
      comments: this.comments,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
