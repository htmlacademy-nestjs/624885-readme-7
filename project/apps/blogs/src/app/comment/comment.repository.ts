import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentEntity } from './comment.entity';
import { Comment } from '@project/core';
import { BlogCommentFactory } from './comment.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(record);
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Comment with id: ${id} not found.`);
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: { id }
    });
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: { postId }
    });

    return records.map(record => this.createEntityDocument(record));
  }
}
