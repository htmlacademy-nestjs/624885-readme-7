import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { QuotePostEntity } from './quote-post.entity';
import { QuotePost } from '@project/core';
import { QuotePostFactory } from './quote-post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class QuotePostRepository extends BasePostgresRepository<QuotePostEntity, QuotePost> {
  constructor(
    entityFactory: QuotePostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: QuotePostEntity): Promise<QuotePostEntity> {
    const document = await this.client.quotePost.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(document);
  }

  public async findById(id: string): Promise<QuotePostEntity> {
    const document = await this.client.quotePost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`QuotePost with id: ${id} not found.`)
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.quotePost.delete({
      where: { id }
    });
  }

  public async update(entity: QuotePostEntity): Promise<void> {
    const { id, text, author, postId } = entity.toPOJO();
    await this.client.quotePost.update({
      where: { id },
      data: { id, text, author, postId }
    });
  }

  public async findByPostId(postId: string): Promise<QuotePostEntity> {
    const document = await this.client.quotePost.findFirst({
      where: { postId }
    });
    if(!document) {
      throw new NotFoundException(`QuotePost with postId: ${postId} not found.`)
    }

    return this.createEntityDocument(document);
  }

}
