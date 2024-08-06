import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogTagEntity } from './tag.entity';
import { Tag } from '@project/core';
import { BlogTagFactory } from './tag.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity, Tag> {
  constructor(
    entityFactory: BlogTagFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async findById(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`Tag with id: ${id} not found.`);
    }

    return this.createEntityDocument(document);
  }

  public async findByTitle(title: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: { title }
    });

    if(!document) {
      throw new NotFoundException(`Tag with title: ${title} not found.`)
    }

    return this.createEntityDocument(document);
  }
}
