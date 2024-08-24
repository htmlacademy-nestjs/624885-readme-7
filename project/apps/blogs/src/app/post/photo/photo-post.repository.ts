import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPost } from '@project/core';
import { PhotoPostFactory } from './photo-post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity, PhotoPost> {
  constructor(
    entityFactory: PhotoPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const document = await this.client.photoPost.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(document);
  }

  public async findById(id: string): Promise<PhotoPostEntity> {
    const document = await this.client.photoPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`PhotoPost with id: ${id} not found.`)
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.photoPost.delete({
      where: { id }
    });
  }

  public async update(entity: PhotoPostEntity): Promise<void> {
    const { id, photo, postId } = entity.toPOJO();
    await this.client.photoPost.update({
      where: { id },
      data: { id, photo, postId }
    });
  }

  public async findByPostId(postId: string): Promise<PhotoPostEntity> {
    const document = await this.client.photoPost.findFirst({
      where: { postId }
    });
    if(!document) {
      throw new NotFoundException(`PhotoPost with postId: ${postId} not found.`)
    }

    return this.createEntityDocument(document);
  }

}
