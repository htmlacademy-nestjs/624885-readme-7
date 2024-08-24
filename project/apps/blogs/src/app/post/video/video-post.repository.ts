import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { VideoPostEntity } from './video-post.entity';
import { VideoPost } from '@project/core';
import { VideoPostFactory } from './video-post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class VideoPostRepository extends BasePostgresRepository<VideoPostEntity, VideoPost> {
  constructor(
    entityFactory: VideoPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: VideoPostEntity): Promise<VideoPostEntity> {
    const document = await this.client.videoPost.create({
      data: { ...entity.toPOJO() }
    });

    return this.createEntityDocument(document);
  }

  public async findById(id: string): Promise<VideoPostEntity> {
    const document = await this.client.videoPost.findFirst({
      where: { id }
    });

    if(!document) {
      throw new NotFoundException(`VideoPost with id: ${id} not found.`)
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.videoPost.delete({
      where: { id }
    });
  }

  public async update(entity: VideoPostEntity): Promise<void> {
    const { id, title, link, postId } = entity.toPOJO();
    await this.client.videoPost.update({
      where: { id },
      data: { id, title, link, postId }
    });
  }

  public async findByPostId(postId: string): Promise<VideoPostEntity> {
    const document = await this.client.videoPost.findFirst({
      where: { postId }
    });
    if(!document) {
      throw new NotFoundException(`VideoPost with postId: ${postId} not found.`)
    }

    return this.createEntityDocument(document);
  }
}
