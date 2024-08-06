import { Injectable } from '@nestjs/common';
import { EntityFactory, Tag } from '@project/core';
import { BlogTagEntity } from './tag.entity';

@Injectable()
export class BlogTagFactory implements EntityFactory<BlogTagEntity> {
  public create(entityPlainData: Tag): BlogTagEntity {
    return new BlogTagEntity(entityPlainData);
  }
}
