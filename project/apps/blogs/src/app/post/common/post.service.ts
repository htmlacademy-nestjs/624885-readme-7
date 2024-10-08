import { BlogTagService } from '@blogs/tag';
import { CreatePostDto, UpdatePostDto } from '@project/posts';
import { BlogPostEntity } from './post.entity';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { VideoPostService } from '../video/video-post.service';
import { BlogPostQuery } from '../../../../../../libs/blogs/posts/src/lib/common/post.query';
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

  public async getAllPosts(query?: BlogPostQuery) {
    const postsWithPagination = await this.blogPostRepository.find(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }
    return result;
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
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
        await this.videoPostService.create(dto.videoPost, createdPost.id);
        break;
      };
      case 'TEXT': {
        await this.textPostService.create(dto.textPost, createdPost.id);
        break;
      }
      case 'QUOTE': {
        await this.quotePostService.create(dto.quotePost, createdPost.id);
        break;
      }
      case 'PHOTO': {
        await this.photoPostService.create(dto.photoPost, createdPost.id);
        break;
      }
      case 'LINK': {
        await this.linkPostService.create(dto.linkPost, createdPost.id);
        break;
      }
    }

    const foundPost = await this.blogPostRepository.findById(createdPost.id);
    return foundPost;
  }

  public async deletePost(id: string) {
    await this.blogPostRepository.deleteById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto) {
    const post = await this.blogPostRepository.findById(id);
    if(!post) {
      return;
    }
    for(const [key, value] of Object.entries(dto)) {
      if( value !== undefined ) {
        switch(key) {
          case 'tags': {
            post.tags = await this.blogTagService.getTagsByTitles(value);
            break;
          }
          case 'videoPost': {
            const updatedPost = await this.videoPostService.update(value, post.id);
            post.videoPost = updatedPost;
            break;
          }
          case 'textPost': {
            const updatedPost = await this.textPostService.update(value, post.id);
            post.textPost = updatedPost;
            break;
          }
          case 'quotePost': {
            const updatedPost = await this.quotePostService.update(value, post.id);
            post.quotePost = updatedPost;
            break;
          }
          case 'photoPost': {
            const updatedPost = await this.photoPostService.update(value, post.id);
            post.photoPost = updatedPost;
            break;
          }
          case 'linkPost': {
            const updatedPost = await this.linkPostService.update(value, post.id);
            post.linkPost = updatedPost;
            break;
          }
          default: {
            post[key] = value;
          }
        }
      }
    }
    await this.blogPostRepository.update(post);

    return post;
  }

  public async repostPost(postId: string, userId: string) {
    const originalPost = await this.blogPostRepository.findById(postId);
    const repostedPost =
    {
      ...originalPost,
      authorId: userId,
      repostFrom: originalPost.id,
      tags: originalPost.tags.map((item) => item.title)
    };
    return this.createPost(repostedPost);
  }
}
