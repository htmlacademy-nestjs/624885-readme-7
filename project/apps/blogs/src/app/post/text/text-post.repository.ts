import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { TextPostEntity } from './text-post.entity';
import { TextPost } from '@project/core';
import { TextPostFactory } from './text-post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<TextPostEntity, TextPost> {
  constructor(
    entityFactory: TextPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: TextPostEntity): Promise<TextPostEntity> {
    const document = await this.client.textPost.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(document);
  }

  public async findById(id: string): Promise<TextPostEntity> {
    const document = await this.client.textPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`TextPost with id: ${id} not found.`)
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.textPost.delete({
      where: { id }
    });
  }

  public async update(entity: TextPostEntity): Promise<void> {
    const { id, title, announce, text, postId } = entity.toPOJO();
    await this.client.textPost.update({
      where: { id },
      data: { id, title, announce, text, postId }
    });
  }


}
