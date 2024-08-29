import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './post.entity';
import { PaginationResult, Post, SortBy } from '@project/core';
import { BlogPostFactory } from './post.factory';
import { PrismaClientService } from '@project/blogs-models';
import { BlogPostQuery } from '../../../../../../libs/blogs/posts/src/lib/common/post.query';
import { Prisma } from '@prisma/client';
import { BlogTagService } from '@blogs/tag';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    private readonly blogTagService: BlogTagService,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({where});
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const record = await this.client.post.create({
      data: {
        ...entity.toPOJO(),
        tags: {
          connect: entity.tags.map(({id}) => ({id}))
        },
        comments: undefined,
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
        likes: true,
        videoPost: true,
        textPost: true,
        quotePost: true,
        photoPost: true,
        linkPost: true
      }
    });
    return this.createEntityDocument(record);
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = query.sortBy === SortBy.CreatedAt
    ?{
      [query.sortBy]: query.sortDirection
    }
    :{
      [query.sortBy]: {
        _count: query.sortDirection
      }
    };
    if(query?.tags) {
      const tagsEntities = await this.blogTagService.getTagsByTitles(query.tags);
      const tags = tagsEntities.map(item => item.id)
      where.tags = {
        some: {
          id: {
            in: tags
          }
        }
      }
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({where, orderBy, skip, take,
        include: {
          tags: true,
          comments: true,
          likes: true,
          videoPost: true,
          textPost: true,
          quotePost: true,
          photoPost: true,
          linkPost: true
        }
      }),
      this.getPostCount(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
        videoPost: true,
        textPost: true,
        quotePost: true,
        photoPost: true,
        linkPost: true
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
        likes: true,
        videoPost: true,
        textPost: true,
        quotePost: true,
        photoPost: true,
        linkPost: true
      }
    })
  }
}
