import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './post.entity';
import { Post } from '@project/core';
import { BlogPostFactory } from './post.factory';
import { PrismaClientService } from '@project/blogs-models';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
    console.log('BlogPostRepository');
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const record = await this.client.post.create({
      data: {
        ...entity.toPOJO(),
        tags: {
          create: entity.tags
        },
        comments: {
          create: entity.comments
        },
        likes: {
          create: entity.likes
        },
        videoPost: undefined,
        quotePost: undefined,
        textPost: undefined,
        photoPost: undefined,
        linkPost: undefined
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    });
    return this.createEntityDocument(record);
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    })

    if(!document) {
      throw new NotFoundException(`Post with ${id} not found.`);
    }

    return this.createEntityDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    })
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: {
        id: pojoEntity.id
      },
      data: {
        id: pojoEntity.id,
        isDraft: pojoEntity.isDraft,
        repostFrom: pojoEntity.repostFrom,
        tags: {
          set: pojoEntity.tags.map((tag) => ({id: tag.id}))
        },
        comments: {
          set: pojoEntity.comments.map((comment) => ({id: comment.id}))
        },
        likes: {
          set: pojoEntity.likes.map((like) => ({id: like.id}))
        }
      },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    })
  }
}
