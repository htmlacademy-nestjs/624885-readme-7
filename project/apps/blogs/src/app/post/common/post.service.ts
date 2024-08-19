import { BlogTagService } from '@blogs/tag';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './post.entity';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { VideoPostService } from '../video/video-post.service';
import { BlogPostQuery } from './post.query';
import { PaginationResult } from '@project/core';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogTagService: BlogTagService,
    private readonly videoPostService: VideoPostService
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    console.log(dto.tags);
    const tags = await this.blogTagService.getTagsByTitles(dto.tags);
    const newPostEntity = this.blogPostFactory.create({
      ...dto,
      comments: [],
      likes: [],
      tags,
      videoPost: undefined
    });
    const createdPost = await this.blogPostRepository.save(newPostEntity);

    switch(dto.type) {
      case 'VIDEO': {
        await this.videoPostService.create(dto.videoPost, createdPost.id);
        break;
      };
      case 'TEXT':
      case 'QUOTE':
      case 'PHOTO':
      case 'LINK':
    }

    const foundPost = await this.blogPostRepository.findById(createdPost.id);
    return foundPost;
  }
}
