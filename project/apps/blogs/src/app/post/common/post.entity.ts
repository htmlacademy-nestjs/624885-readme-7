import { PostType } from '@prisma/client';
import { Entity, Post, StorableEntity } from '@project/core';
import { BlogTagEntity } from '../../tag/tag.entity';
import { BlogCommentEntity } from '../../comment/comment.entity';
import { BlogLikeEntity } from '../../like/like.entity';
import { BlogTagFactory } from '../../tag/tag.factory';
import { BlogCommentFactory } from '../../comment/comment.factory';
import { BlogLikeFactory } from '../../like/like.factory';

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
    this.tags = [];
    this.comments = [];
    this.likes = [];
    this.createdAt = post.createdAt ?? undefined;
    this.updatedAt = post.updatedAt ?? undefined;

    const blogTagFactory = new BlogTagFactory();
    for(const tag of post.tags) {
      const blogTagEntity = blogTagFactory.create(tag);
      this.tags.push(blogTagEntity);
    }

    const blogCommentFactory = new BlogCommentFactory();
    for(const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogLikeFactory = new BlogLikeFactory();
    for(const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }
  }

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
      updatedAt: this.updatedAt
    }
  }
}
