import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogLikeEntity } from './like.entity';
import { Like } from '@project/core';
import { BlogLikeFactory } from './like.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogLikeEntity): Promise<BlogLikeEntity> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(record);
  }

  public async findById(id: string): Promise<BlogLikeEntity> {
    const document = await this.client.like.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Like with id: ${id} not found.`);
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: { id }
    });
  }

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    const documents = await this.client.like.findMany({
      where: { postId }
    })

    if(documents.length === 0) {
      throw new NotFoundException(`Likes for post with id: ${postId} not found.`);
    }

    return documents.map((document) => this.createEntityDocument(document));
  }

  public async countByPostId(postId: string): Promise<number> {
    return this.client.like.count({
      where: { postId }
    });
  }
}
