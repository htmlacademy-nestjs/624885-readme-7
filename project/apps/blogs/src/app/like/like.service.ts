import { Injectable } from '@nestjs/common';
import { BlogLikeRepository } from './like.repository';
import { BlogPostService } from '../post/common/post.service';
import { BlogLikeFactory } from './like.factory';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostService: BlogPostService,
    private readonly blogLikeFactory: BlogLikeFactory
  ) {}

  public async getLikes(postId: string) {
    return this.blogLikeRepository.findByPostId(postId);
  }

  public async getNumberOfLikes(postId: string) {
    return this.blogLikeRepository.countByPostId(postId);
  }

  public async addLike(postId: string, userId: string) {
    const existsPost = await this.blogPostService.getPost(postId);
    const newLike = this.blogLikeFactory.create({
      postId: existsPost.id,
      userId
    });
    await this.blogLikeRepository.save(newLike);

    return newLike;
  }
}
