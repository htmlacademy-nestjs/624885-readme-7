import { Injectable } from '@nestjs/common';
import { EntityFactory, Like } from '@project/core';
import { BlogLikeEntity } from './like.entity';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }
}
