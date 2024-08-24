import { Injectable } from '@nestjs/common';
import { EntityFactory, Like } from '@project/core';
import { BlogLikeEntity } from './like.entity';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    const entity = new BlogLikeEntity();
    this.populate(entity, entityPlainData);
    return entity;
  }

  private populate(entity:BlogLikeEntity, like: Like) {
    if(!like) {
      return;
    }

    entity.id = like.id ?? undefined;
    entity.userId = like.userId;
    entity.postId = like.postId;
  }
}
