import { BlogTagService } from '@blogs/tag';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './post.entity';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { VideoPostService } from '../video/video-post.service';
import { BlogPostQuery } from './post.query';
import { PaginationResult } from '@project/core';
import { TextPostService } from '../text/text-post.sevice';
import { QuotePostService } from '../quote/quote-post.service';
import { PhotoPostService } from '../photo/photo-post.service';
import { LinkPostService } from '../link/link-post.service';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogTagService: BlogTagService,
    private readonly videoPostService: VideoPostService,
    private readonly textPostService: TextPostService,
    private readonly quotePostService: QuotePostService,
    private readonly photoPostService: PhotoPostService,
    private readonly linkPostService: LinkPostService
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
      videoPost: undefined,
      textPost: undefined,
      quotePost: undefined,
      photoPost: undefined,
      linkPost: undefined
    });
    const createdPost = await this.blogPostRepository.save(newPostEntity);

    switch(dto.type) {
      case 'VIDEO': {
        console.log('videoPost');
        await this.videoPostService.create(dto.videoPost, createdPost.id);
        break;
      };
      case 'TEXT': {
        console.log('textPost');
        await this.textPostService.create(dto.textPost, createdPost.id);
        break;
      }
      case 'QUOTE': {
        console.log('quotePost');
        await this.quotePostService.create(dto.quotePost, createdPost.id);
        break;
      }
      case 'PHOTO': {
        console.log('photoPost');
        await this.photoPostService.create(dto.photoPost, createdPost.id);
        break;
      }
      case 'LINK': {
        console.log('linkPost');
        await this.linkPostService.create(dto.linkPost, createdPost.id);
        break;
      }
    }

    const foundPost = await this.blogPostRepository.findById(createdPost.id);
    return foundPost;
  }
}
