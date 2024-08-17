import { Injectable } from '@nestjs/common';
import { EntityFactory, Post } from '@project/core';
import { BlogPostEntity } from './post.entity';
import { BlogTagFactory } from '@blogs/tag';
import { BlogCommentFactory } from '@blogs/comment';
import { BlogLikeFactory } from '@blogs/like';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  constructor(
    private readonly blogTagFactory: BlogTagFactory,
    private readonly blogLikeFactory: BlogLikeFactory,
    private readonly blogCommentFactory: BlogCommentFactory
  ) {}

  public create(entityPlainData: Post): BlogPostEntity {
    const entity = new BlogPostEntity();
    this.populate(entity, entityPlainData);

    return entity;
  }

  private populate(entity: BlogPostEntity, post: Post) {
    if(!post) {
      return;
    }

    entity.id = post.id ?? undefined;
    entity.authorId = post.authorId;
    entity.isDraft = post.isDraft;
    entity.repostFrom = post.repostFrom ?? undefined;
    entity.type = post.type;
    entity.tags = [];
    entity.comments = [];
    entity.likes = [];
    entity.createdAt = post.createdAt ?? undefined;
    entity.updatedAt = post.updatedAt ?? undefined;

    for(const tag of post.tags) {
      const blogTagEntity = this.blogTagFactory.create(tag);
      entity.tags.push(blogTagEntity);
    }

    for(const comment of post.comments) {
      const blogCommentEntity = this.blogCommentFactory.create(comment);
      entity.comments.push(blogCommentEntity);
    }

    for(const like of post.likes) {
      const blogLikeEntity = this.blogLikeFactory.create(like);
      entity.likes.push(blogLikeEntity);
    }
  }
}
