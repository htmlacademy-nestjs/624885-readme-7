import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { LinkPostEntity } from './link-post.entity';
import { LinkPost } from '@project/core';
import { LinkPostFactory } from './link-post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class LinkPostRepository extends BasePostgresRepository<LinkPostEntity, LinkPost> {
  constructor(
    entityFactory: LinkPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: LinkPostEntity): Promise<LinkPostEntity> {
    const document = await this.client.linkPost.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(document);
  }

  public async findById(id: string): Promise<LinkPostEntity> {
    const document = await this.client.linkPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`LinkPost with id: ${id} not found.`)
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.linkPost.delete({
      where: { id }
    });
  }

  public async update(entity: LinkPostEntity): Promise<void> {
    const { id, description, link, postId } = entity.toPOJO();
    await this.client.linkPost.update({
      where: { id },
      data: { id, description, link, postId }
    });
  }

  public async findByPostId(postId: string): Promise<LinkPostEntity> {
    const document = await this.client.linkPost.findFirst({
      where: { postId }
    });
    if(!document) {
      throw new NotFoundException(`LinkPost with postId: ${postId} not found.`)
    }

    return this.createEntityDocument(document);
  }

}
