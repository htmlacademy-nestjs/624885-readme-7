import { Injectable } from '@nestjs/common';
import { Comment, EntityFactory } from '@project/core';
import { BlogCommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  private populate(entity: BlogCommentEntity, comment: Comment) {
    if(!comment) {
      return;
    }

    entity.id = comment.id ?? undefined;
    entity.text = comment.text;
    entity.authorId = comment.authorId;
    entity.createdAt = comment.createdAt;
    entity.updatedAt = comment.updatedAt;
    entity.postId = comment.postId;
  }

  public create(entityPlainData: Comment): BlogCommentEntity {
    const entity = new BlogCommentEntity();
    this.populate(entity, entityPlainData);
    return entity;
  }

  public createFromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    const currentDate = new Date();
    const entity = new BlogCommentEntity();
    this.populate(entity,{
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return entity;
  }
}
